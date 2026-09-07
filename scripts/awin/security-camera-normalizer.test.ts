import { describe, expect, it } from "vitest";
import { isSecurityCameraCandidate, parseSecurityCameraAttributes } from "./security-camera-normalizer";

describe("security camera feed normalization", () => {
  it("recognizes a real outdoor camera and its hard attributes", () => {
    const name = "eufy SoloCam E42 4K WLAN Außenkamera mit Solarpanel 2er Set";
    expect(isSecurityCameraCandidate({ product_name: name })).toBe(true);
    expect(parseSecurityCameraAttributes(name)).toMatchObject({ placement: "outdoor", connection: "wifi", power: "solar", resolution: "4k", cameraCount: 2 });
  });

  it("keeps accessories and video doorbells out of the camera catalog", () => {
    expect(isSecurityCameraCandidate({ product_name: "Ring Battery Video Doorbell Plus" })).toBe(false);
    expect(isSecurityCameraCandidate({ product_name: "eufy Solarpanel für Überwachungskamera" })).toBe(false);
    expect(isSecurityCameraCandidate({ product_name: "Imou Solar Panel 8W - Solarpanel mit USB-C Anschluss für Akku-Kamera" })).toBe(false);
    expect(isSecurityCameraCandidate({ product_name: "TP-Link Tapo A100 Kamera Akku Pack" })).toBe(false);
    expect(isSecurityCameraCandidate({ product_name: "omajin Baby Camera WLAN Babykamera" })).toBe(false);
    expect(isSecurityCameraCandidate({ product_name: "eufy SoloCam E42 Außenkamera mit Solarpanel" })).toBe(true);
    expect(isSecurityCameraCandidate({ product_name: "Arlo Kamera + 3 Solar Panels" })).toBe(true);
  });

  it("recognizes PoE and pan tilt cameras", () => {
    expect(parseSecurityCameraAttributes("Reolink 4K PoE Außenkamera PTZ")).toMatchObject({ placement: "outdoor", connection: "poe", power: "poe", resolution: "4k", panTilt: true });
  });
});
