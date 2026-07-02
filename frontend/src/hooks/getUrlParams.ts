const params = new URLSearchParams(window.location.search);


type ViewMode = "normal" | "embedded";

export const viewMode: ViewMode = params.get("embed") === "true" ? "embedded" : "normal";
