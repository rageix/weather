import AppIdStore from '../Stores/SettingsStore.ts';

export interface GeoCodeResponseItem {
  name: string;
  local_names: {
    ms: string;
    gu: string;
    is: string;
    wa: string;
    mg: string;
    gl: string;
    om: string;
    ku: string;
    tw: string;
    mk: string;
    ee: string;
    fj: string;
    gd: string;
    ky: string;
    yo: string;
    zu: string;
    bg: string;
    tk: string;
    co: string;
    sh: string;
    de: string;
    kl: string;
    bi: string;
    km: string;
    lt: string;
    fi: string;
    fy: string;
    ba: string;
    sc: string;
    feature_name: string;
    ja: string;
    am: string;
    sk: string;
    mr: string;
    es: string;
    sq: string;
    te: string;
    br: string;
    uz: string;
    da: string;
    sw: string;
    fa: string;
    sr: string;
    cu: string;
    ln: string;
    na: string;
    wo: string;
    ig: string;
    to: string;
    ta: string;
    mt: string;
    ar: string;
    su: string;
    ab: string;
    ps: string;
    bm: string;
    mi: string;
    kn: string;
    kv: string;
    os: string;
    bn: string;
    li: string;
    vi: string;
    zh: string;
    eo: string;
    ha: string;
    tt: string;
    lb: string;
    ce: string;
    hu: string;
    it: string;
    tl: string;
    pl: string;
    sm: string;
    en: string;
    vo: string;
    el: string;
    sn: string;
    fr: string;
    cs: string;
    io: string;
    hi: string;
    et: string;
    pa: string;
    av: string;
    ko: string;
    bh: string;
    yi: string;
    sa: string;
    sl: string;
    hr: string;
    si: string;
    so: string;
    gn: string;
    ay: string;
    se: string;
    sd: string;
    af: string;
    ga: string;
    or: string;
    ia: string;
    ie: string;
    ug: string;
    nl: string;
    gv: string;
    qu: string;
    be: string;
    an: string;
    fo: string;
    hy: string;
    nv: string;
    bo: string;
    ascii: string;
    id: string;
    lv: string;
    ca: string;
    no: string;
    nn: string;
    ml: string;
    my: string;
    ne: string;
    he: string;
    cy: string;
    lo: string;
    jv: string;
    sv: string;
    mn: string;
    tg: string;
    kw: string;
    cv: string;
    az: string;
    oc: string;
    th: string;
    ru: string;
    ny: string;
    bs: string;
    st: string;
    ro: string;
    rm: string;
    ff: string;
    kk: string;
    uk: string;
    pt: string;
    tr: string;
    eu: string;
    ht: string;
    ka: string;
    ur: string;
  };
  lat: number;
  lon: number;
  country: string;
  state: string;
}

/**
 * Gets geo data for given query.
 * https://openweathermap.org/api/geocoding-api
 * @param q - City name, state code (only for the US) and country code divided by comma. Please use ISO 3166 country codes.
 * @param limit - Number of the locations in the API response (up to 5 results can be returned in the API response)
 * @return {Promise<GeoCodeResponseItem[]>}
 */
export async function getGeo(
  q: string,
  limit = 5,
): Promise<GeoCodeResponseItem[]> {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=${limit}&appid=${AppIdStore.apiKey}`,
  );

  return await response.json();
}
