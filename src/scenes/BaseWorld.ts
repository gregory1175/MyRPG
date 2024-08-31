import tilesJSON from "../assets/BaseWorld.json";
import { Boar, Enemy } from "../entity/enemy";
import { Player } from "../entity/player";
import { SIZES, TILES, LAYERS, SPRITES } from "../utils/constants";

export class BaseWorld extends Phaser.Scene {
  private player?: Player;
  private boars: Boar[] = [];

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

    this.load.spritesheet(SPRITES.BOAR.base, "src/assets/characters/boar.png", {
      frameWidth: SIZES.BOAR.WIDTH,
      frameHeight: SIZES.BOAR.HEIGHT,
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

    this.player = new Player(this, 100, 500, SPRITES.PLAYER);
    this.boars.push(new Boar(this, 300, 250, SPRITES.BOAR.base));
    this.boars.push(new Boar(this, 300, 200, SPRITES.BOAR.base));
    this.boars.push(new Boar(this, 300, 150, SPRITES.BOAR.base));
    this.boars.push(new Boar(this, 300, 100, SPRITES.BOAR.base));

    this.boars.forEach((boar) => {
      boar.setPlayer(this.player);
    });

    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, wallsLayer);
    wallsLayer.setCollisionByExclusion([-1]);
    // wallsLayer.setCollisionBetween(5, 26);
  }

  update(_: number, delta: number) {
    this.player.update(delta);
    this.boars.forEach((boar) => {
      boar.update();
    });
  }
}
