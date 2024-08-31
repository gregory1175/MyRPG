import tilesJSON from "../assets/BaseWorld.json";
import { Player } from "../entity/player";
import { SIZES, TILES, LAYERS, SPRITES } from "../utils/constants";

export class BaseWorld extends Phaser.Scene {
  private player?: Player;
  constructor() {
    super("MyRPG");
  }

  preload() {
    this.load.image(TILES.BASEWORLD, "src/assets/Base.png");
    this.load.tilemapTiledJSON("map", "src/assets/BaseWorld.json");
    this.load.spritesheet(SPRITES.PLAYER, "src/assets/characters/Man.png", {
      frameWidth: SIZES.PLAYER.WIDTH,
      frameHeight: SIZES.PLAYER.HEIGHT,
    });
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage(
      tilesJSON.tilesets[0].name,
      TILES.BASEWORLD,
      SIZES.TILE,
      SIZES.TILE
    );
    const groundLayer = map.createLayer(LAYERS.GROUND, tileset, 0, 0);
    const wallsLayer = map.createLayer(LAYERS.WALLS, tileset, 0, 0);

    this.player = new Player(this, 400, 250, SPRITES.PLAYER);
  }

  update(_: number, delta: number) {
    this.player.update(delta);
  }
}
