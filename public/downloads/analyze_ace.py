#!/usr/bin/env python3
"""Reproducible analysis of NYC ACE records supplied on 2026-07-22.

Uses only pandas/numpy plus Python's standard library. Spatial assignment is an
explicit point-in-polygon join to official NYC DCP 2020 census tract geometry;
the tract attributes provide borough and 2020 NTA neighborhood.
"""
from __future__ import annotations

import csv, json, math, re
from collections import defaultdict
from datetime import date
from pathlib import Path

import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "outputs"
WORK = ROOT / "work"
VIOL = Path("/Users/quinnfriedman/Downloads/ACE_Violations_(All_Manhattan_Routes)_20260722.csv")
IMPL = Path("/Users/quinnfriedman/Desktop/ACE_Bus_Routes_Implementation_Dates_20260722 (1).csv")
TRACTS = WORK / "nyc_census_tracts_2020.geojson"
NTA = WORK / "nyc_nta_2020.geojson"

EXEMPT = {"EXEMPT - EMERGENCY VEHICLE", "EXEMPT - COMMERCIAL UNDER 20", "EXEMPT - BUS/PARATRANSIT", "EXEMPT - OTHER"}
TECH = {"TECHNICAL ISSUE/OTHER"}
DMV = {"DRIVER/VEHICLE INFO MISSING"}
ISSUED = {"VIOLATION ISSUED"}
KNOWN = EXEMPT | TECH | DMV | ISSUED

def point_in_ring(x, y, ring):
    inside = False
    j = len(ring) - 1
    for i in range(len(ring)):
        xi, yi = ring[i][0], ring[i][1]; xj, yj = ring[j][0], ring[j][1]
        if ((yi > y) != (yj > y)) and (x < (xj-xi)*(y-yi)/(yj-yi) + xi): inside = not inside
        j = i
    return inside

def point_in_geom(x, y, geom):
    polys = [geom["coordinates"]] if geom["type"] == "Polygon" else geom["coordinates"]
    for poly in polys:
        if point_in_ring(x, y, poly[0]) and not any(point_in_ring(x, y, h) for h in poly[1:]): return True
    return False

def load_spatial(path):
    data=json.loads(path.read_text()); out=[]
    for f in data["features"]:
        g=f["geometry"]
        coords=[]
        def collect(v):
            if isinstance(v[0], (int,float)): coords.append(v)
            else:
                for z in v: collect(z)
        collect(g["coordinates"])
        xs=[z[0] for z in coords]; ys=[z[1] for z in coords]
        out.append((min(xs),min(ys),max(xs),max(ys),g,f["properties"]))
    return out

def spatial_lookup(unique_xy, features):
    ans=[]
    for x,y in unique_xy:
        found=None
        for xmin,ymin,xmax,ymax,g,p in features:
            if xmin <= x <= xmax and ymin <= y <= ymax and point_in_geom(x,y,g): found=p; break
        ans.append(found)
    return ans

def norm_stop(s):
    if pd.isna(s): return "<MISSING STOP>"
    s = re.sub(r"[^A-Z0-9+/ ]", " ", str(s).upper())
    s = re.sub(r"\bAVENUE\b", "AV", s); s = re.sub(r"\bSTREET\b", "ST", s)
    s = re.sub(r"\bROAD\b", "RD", s); s = re.sub(r"\bBOULEVARD\b", "BLVD", s)
    return re.sub(r"\s+", " ", s).strip()

def route_norm(s):
    s=str(s).upper().strip().replace(" ","")
    return {"M14A+":"M14+", "M14D+":"M14+", "M15+":"M15+", "M23+":"M23+", "M34+":"M34+", "M34A+":"M34+", "M60+":"M60+", "M79+":"M79+", "M86+":"M86+"}.get(s,s)

def mann_kendall(y):
    y=np.asarray(y,float); n=len(y); s=sum(np.sign(y[j]-y[i]) for i in range(n-1) for j in range(i+1,n))
    _,counts=np.unique(y,return_counts=True)
    var=(n*(n-1)*(2*n+5)-sum(c*(c-1)*(2*c+5) for c in counts))/(18)
    z=(s-1)/math.sqrt(var) if s>0 else ((s+1)/math.sqrt(var) if s<0 else 0)
    p=math.erfc(abs(z)/math.sqrt(2)); tau=s/(n*(n-1)/2)
    slopes=[(y[j]-y[i])/(j-i) for i in range(n-1) for j in range(i+1,n)]
    return {"n":n,"tau":tau,"z":z,"p_value":p,"sen_slope_per_month":float(np.median(slopes))}

def ols_trend(y, weights=None):
    y=np.asarray(y,float); x=np.arange(len(y),dtype=float); X=np.column_stack([np.ones(len(y)),x])
    if weights is None: weights=np.ones(len(y))
    w=np.asarray(weights,float); b=np.linalg.solve(X.T@(w[:,None]*X), X.T@(w*y)); resid=y-X@b
    df=len(y)-2; s2=np.sum(w*resid**2)/df; cov=s2*np.linalg.inv(X.T@(w[:,None]*X)); se=math.sqrt(cov[1,1]); t=b[1]/se
    # Normal approximation is conservative enough for the long monthly series.
    p=math.erfc(abs(t)/math.sqrt(2)); r2=1-np.sum(w*resid**2)/np.sum(w*(y-np.average(y,weights=w))**2)
    return {"n":len(y),"intercept":b[0],"slope_per_month":b[1],"se":se,"t_or_z":t,"p_value_normal_approx":p,"r_squared":r2}

def add_rates(tbl):
    tbl=tbl.copy()
    tbl["violation_share"] = tbl["violations"] / tbl["violations"].sum()
    tbl["exempt_reject_rate"] = tbl["exempt_reject_total"] / tbl["all_records"]
    tbl["exemption_rate"] = tbl["exemptions"] / tbl["all_records"]
    tbl["technical_reject_rate"] = tbl["technical_rejections"] / tbl["all_records"]
    tbl["dmv_reject_rate"] = tbl["dmv_rejections"] / tbl["all_records"]
    return tbl

def summary_group(df, keys):
    g=df.groupby(keys,dropna=False).agg(all_records=("violation_id","size"),violations=("is_violation","sum"),exemptions=("is_exempt","sum"),technical_rejections=("is_technical","sum"),dmv_rejections=("is_dmv","sum"),exempt_reject_total=("is_nonissued","sum")).reset_index()
    return add_rates(g)

def main():
    OUT.mkdir(exist_ok=True)
    raw=pd.read_csv(VIOL,dtype=str)
    raw.columns=[c.strip() for c in raw.columns]
    source_rows=len(raw); source_cols=list(raw.columns)
    missing=raw.isna().sum().rename("missing_count").to_frame(); missing["missing_pct"]=missing.missing_count/source_rows
    exact_full=int(raw.duplicated(keep=False).sum()); exact_extra=int(raw.duplicated().sum())
    id_dup_rows=int(raw["Violation ID"].duplicated(keep=False).sum()); id_dup_extra=int(raw["Violation ID"].duplicated().sum())
    id_conflicts=int(raw.loc[raw["Violation ID"].duplicated(keep=False)].groupby("Violation ID").filter(lambda x:len(x.drop_duplicates())>1)["Violation ID"].nunique())
    # IDs identify records; retain first occurrence only. Exact duplicates and conflicting IDs are separately audited.
    d=raw.drop_duplicates("Violation ID",keep="first").copy()
    d["occurrence"]=pd.to_datetime(d["First Occurrence"],format="%m/%d/%Y %I:%M:%S %p",errors="coerce")
    xy=d["Violation Georeference"].str.extract(r"^POINT \(([-+0-9.eE]+) ([-+0-9.eE]+)\)$")
    d["longitude"]=pd.to_numeric(xy[0],errors="coerce"); d["latitude"]=pd.to_numeric(xy[1],errors="coerce")
    d["status"]=d["Violation Status"].str.strip(); d["route"]=d["Bus Route ID"].map(route_norm); d["stop_name_original"]=d["Stop Name"]
    d["stop_name_standardized"]=d["Stop Name"].map(norm_stop)
    valid_date=d.occurrence.notna(); valid_status=d.status.isin(KNOWN); valid_coord=d.longitude.between(-180,180)&d.latitude.between(-90,90)
    plausible_nyc=d.longitude.between(-74.30,-73.65)&d.latitude.between(40.45,40.95)
    coord_valid=valid_coord & plausible_nyc
    # Spatial lookup uses unique exact coordinate pairs for speed, preserving exact input coordinates.
    uniq=d.loc[coord_valid,["longitude","latitude"]].drop_duplicates().reset_index(drop=True)
    tracts=load_spatial(TRACTS); props=spatial_lookup(uniq.itertuples(index=False,name=None),tracts)
    uniq["borough"]=[p.get("boroname") if p else None for p in props]; uniq["nta_code"]=[p.get("nta2020") if p else None for p in props]; uniq["neighborhood"]=[p.get("ntaname") if p else None for p in props]
    d=d.merge(uniq,on=["longitude","latitude"],how="left")
    d["in_manhattan"]=d.borough.eq("Manhattan")
    d["exclude_reason"]=""
    d.loc[~valid_date,"exclude_reason"]="invalid_or_missing_date"
    d.loc[valid_date & ~valid_status,"exclude_reason"]="unknown_or_missing_status"
    d.loc[valid_date & valid_status & ~coord_valid,"exclude_reason"]="invalid_missing_or_implausible_coordinate"
    d.loc[valid_date & valid_status & coord_valid & ~d.in_manhattan,"exclude_reason"]="outside_manhattan_or_unmatched_geometry"
    clean=d[d.exclude_reason.eq("")].copy()
    clean["violation_id"]=clean["Violation ID"]
    clean["month"]=clean.occurrence.dt.to_period("M").astype(str)
    clean["date"]=clean.occurrence.dt.date.astype(str)
    clean["is_violation"]=clean.status.isin(ISSUED).astype(int); clean["is_exempt"]=clean.status.isin(EXEMPT).astype(int)
    clean["is_technical"]=clean.status.isin(TECH).astype(int); clean["is_dmv"]=clean.status.isin(DMV).astype(int); clean["is_nonissued"]=(1-clean.is_violation)
    # Standardized physical stop groups: rounded to 4 decimals (~8-11m), then canonical label by modal stop name.
    clean["lon_4"]=clean.longitude.round(4); clean["lat_4"]=clean.latitude.round(4)
    clean["stop_canonical"]=clean.stop_name_standardized.map(lambda s:" / ".join(sorted([z.strip() for z in s.split("/")])) if "/" in s else s)
    clean["corridor"]=clean.stop_name_standardized.str.split("/",n=1).str[0].str.strip()

    impl=pd.read_csv(IMPL,dtype=str); impl.columns=[c.strip() for c in impl.columns]; impl["route"]=impl.Route.map(route_norm); impl["implementation_date"]=pd.to_datetime(impl["Implementation Date"],format="%m/%d/%Y",errors="coerce")
    impl=impl.groupby("route",as_index=False).implementation_date.min()
    routes_data=set(clean.route.unique()); routes_impl=set(impl.route.unique())
    missing_impl=sorted(routes_data-routes_impl)
    clean=clean.merge(impl,on="route",how="left")
    clean["before_implementation"]=clean.implementation_date.notna() & (clean.occurrence.dt.normalize()<clean.implementation_date)
    preimplementation=clean[clean.before_implementation].copy()
    clean=clean[~clean.before_implementation].copy()

    monthly=summary_group(clean,"month")
    month_starts=pd.to_datetime(monthly.month+"-01")
    data_min=clean.occurrence.min(); data_max=clean.occurrence.max()
    route_days=[]; active_routes=[]
    for ms in month_starts:
        me=ms+pd.offsets.MonthEnd(0); obs_start=max(ms,data_min.normalize()); obs_end=min(me,data_max.normalize())
        days=0; active=0
        for _,r in impl.iterrows():
            start=max(obs_start,r.implementation_date)
            if pd.notna(start) and start<=obs_end: days+=(obs_end-start).days+1; active+=1
        route_days.append(days); active_routes.append(active)
    monthly["active_routes"]=active_routes; monthly["active_route_days"]=route_days
    monthly["violations_per_active_route_day"]=monthly.violations/monthly.active_route_days
    monthly["records_per_active_route_day"]=monthly.all_records/monthly.active_route_days
    monthly["days_observed"]=[(min(ms+pd.offsets.MonthEnd(0),data_max.normalize())-max(ms,data_min.normalize())).days+1 for ms in month_starts]
    monthly["partial_month"]=[(data_min.normalize()>ms) or (data_max.normalize()<ms+pd.offsets.MonthEnd(0)) for ms in month_starts]
    # Constant cohort: routes implemented by end of the first observed month and present in data.
    cohort=sorted(set(impl.loc[impl.implementation_date<=month_starts.min()+pd.offsets.MonthEnd(0),"route"]) & routes_data)
    cm=clean[clean.route.isin(cohort)].groupby("month").is_violation.sum().reindex(monthly.month,fill_value=0)
    monthly["constant_cohort_violations"]=cm.values; monthly["constant_cohort_routes"]=len(cohort)

    usable_all=monthly[~monthly.partial_month & (monthly.active_route_days>0)].copy()
    usable=usable_all[usable_all.month<="2026-03"].copy()
    stats={
      "total_monthly_violations_mann_kendall":mann_kendall(usable.violations),
      "route_day_adjusted_violations_mann_kendall":mann_kendall(usable.violations_per_active_route_day),
      "constant_cohort_violations_mann_kendall":mann_kendall(usable.constant_cohort_violations),
      "combined_exempt_reject_rate_mann_kendall":mann_kendall(usable.exempt_reject_rate),
      "combined_exempt_reject_rate_weighted_ols":ols_trend(usable.exempt_reject_rate,usable.all_records),
      "sensitivity_all_complete_months_total_violations_mann_kendall":mann_kendall(usable_all.violations),
      "sensitivity_all_complete_months_route_day_adjusted_mann_kendall":mann_kendall(usable_all.violations_per_active_route_day),
      "sensitivity_all_complete_months_nonissued_rate_mann_kendall":mann_kendall(usable_all.exempt_reject_rate),
      "notes":"Primary trend tests exclude first/last partial calendar months and end at 2026-03 because April-June show 2,093/0/0 issued violations despite continued non-issued records, consistent with outcome maturation/right censoring. Sensitivity tests include every complete month. Mann-Kendall is nonparametric; Sen slope is median monthly change. Weighted OLS on monthly non-issued share uses monthly record totals as weights and a normal approximation for p. Descriptive, not causal."
    }

    neighborhood=summary_group(clean,"neighborhood").sort_values("violations",ascending=False)
    route=summary_group(clean,"route").sort_values("violations",ascending=False)
    stop=summary_group(clean,"stop_canonical").sort_values("violations",ascending=False)
    stop=stop.merge(clean.groupby("stop_canonical",as_index=False).agg(longitude=("longitude","median"),latitude=("latitude","median")),on="stop_canonical")
    corridor=summary_group(clean,"corridor").sort_values("violations",ascending=False)
    route_stop=summary_group(clean,["route","stop_canonical"]).sort_values("violations",ascending=False)
    route_stop=route_stop.merge(clean.groupby(["route","stop_canonical"],as_index=False).agg(longitude=("longitude","median"),latitude=("latitude","median")),on=["route","stop_canonical"])
    # Rate rankings require at least 1,000 records (pre-specified to suppress tiny denominators).
    threshold=1000
    hotspots={
      "top_violation_neighborhoods":neighborhood.head(15).to_dict("records"),
      "top_violation_routes":route.head(15).to_dict("records"),
      "top_violation_stops":stop.head(25).to_dict("records"),
      "top_violation_corridors":corridor.head(20).to_dict("records"),
      "top_exempt_reject_rate_neighborhoods":neighborhood[neighborhood.all_records>=threshold].sort_values("exempt_reject_rate",ascending=False).head(15).to_dict("records"),
      "top_exempt_reject_rate_routes":route[route.all_records>=threshold].sort_values("exempt_reject_rate",ascending=False).head(15).to_dict("records"),
      "top_exempt_reject_rate_stops":stop[stop.all_records>=threshold].sort_values("exempt_reject_rate",ascending=False).head(25).to_dict("records"),
      "top_exempt_reject_rate_corridors":corridor[corridor.all_records>=threshold].sort_values("exempt_reject_rate",ascending=False).head(20).to_dict("records"),
      "minimum_records_for_rate_ranking":threshold
    }
    statuses=raw["Violation Status"].fillna("<MISSING>").value_counts(dropna=False).rename_axis("status").reset_index(name="count")
    exclusions=d.exclude_reason.replace("", "included_spatial_status_date").value_counts().rename_axis("disposition").reset_index(name="count")
    exclusions=pd.concat([exclusions,pd.DataFrame([{"disposition":"preimplementation_excluded_from_analysis","count":len(preimplementation)},{"disposition":"final_analytical_dataset","count":len(clean)}])],ignore_index=True)
    quality={"source_rows":source_rows,"source_columns":source_cols,"source_date_min":str(pd.to_datetime(raw["First Occurrence"],format="%m/%d/%Y %I:%M:%S %p",errors="coerce").min()),"source_date_max":str(pd.to_datetime(raw["First Occurrence"],format="%m/%d/%Y %I:%M:%S %p",errors="coerce").max()),"full_duplicate_rows_including_first":exact_full,"full_duplicate_extra_rows":exact_extra,"duplicate_id_rows_including_first":id_dup_rows,"duplicate_id_extra_rows_removed":id_dup_extra,"conflicting_duplicate_ids":id_conflicts,"clean_rows":len(clean),"excluded_rows_after_id_dedup":int((d.exclude_reason!="").sum())+len(preimplementation),"routes_without_implementation_date":missing_impl,"constant_cohort_routes":cohort,"before_implementation_records":len(preimplementation),"coordinate_method":"Exact longitude/latitude point-in-polygon against NYC DCP 2020 Census Tracts; borough=Manhattan retained; NTA2020/ NTAName taken from containing tract.","stop_method":"Uppercase/punctuation and common street-suffix normalization; reversed intersection order is standardized to one canonical stop label; median coordinates retained for display.","corridor_method":"First street component of standardized original stop label before '/'. Corridors with ambiguous/non-intersection labels remain literal.","rate_ranking_minimum_records":threshold}
    # Exclusion audit includes original post-ID-dedup rows.
    missing.to_csv(OUT/"data_quality_missing_values.csv")
    statuses.to_csv(OUT/"status_values.csv",index=False); exclusions.to_csv(OUT/"exclusions_summary.csv",index=False)
    monthly.to_csv(OUT/"monthly_summary.csv",index=False); neighborhood.to_csv(OUT/"neighborhood_summary.csv",index=False); route.to_csv(OUT/"route_summary.csv",index=False); stop.to_csv(OUT/"stop_summary.csv",index=False); corridor.to_csv(OUT/"corridor_summary.csv",index=False); route_stop.to_csv(OUT/"route_stop_summary.csv",index=False)
    impl.to_csv(OUT/"route_implementation_dates_cleaned.csv",index=False)
    cols=["violation_id","occurrence","date","month","status","route","stop_name_original","stop_name_standardized","stop_canonical","corridor","longitude","latitude","borough","nta_code","neighborhood","implementation_date","before_implementation","is_violation","is_exempt","is_technical","is_dmv","is_nonissued"]
    clean[cols].to_csv(OUT/"ace_manhattan_cleaned.csv",index=False)
    (OUT/"analysis_results.json").write_text(json.dumps({"quality":quality,"stats":stats,"hotspots":hotspots},indent=2,default=str))
    print(json.dumps({"quality":quality,"stats":stats,"monthly_rows":len(monthly)},indent=2,default=str))

if __name__ == "__main__": main()
