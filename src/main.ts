import Phaser from "phaser";
import style from "./style.css";
import { scense } from "./scenes";

new Phaser.Game({
  width: 800,
  height: 600,
  title: "MyRPG",
  scene: scense,
  url: import.meta.env.URL || "",
  version: import.meta.env.VERSION || "0.0.1",
  backgroundColor: "#000",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
});
