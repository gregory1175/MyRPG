import Phaser from "phaser";
import { scense } from "./scenes";

new Phaser.Game({
  width: 800,
  height: 600,
  title: "MyRPG",
  scene: scense,
  url: /* import.meta.env.URL  || */ "",
  version: /* import.meta.env.VERSION || */ "0.0.1",
  backgroundColor: "#000",
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
});
