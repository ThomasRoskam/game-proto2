import * as PIXI from 'pixi.js'
import { Game } from '../game'

export class Plus extends PIXI.Sprite {
    yspeed: number = 0
    xspeed: number = 0
    game: Game


    constructor(texture: PIXI.Texture, game:Game) {
        super(texture)
        this.game = game

        this.x = 5
        this.y = 180

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case" ":

            break   

        
            case "A":
            case "ARROWLEFT":
                this.xspeed = -4
                this.scale.set(-1,1)
                break
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 4
                this.scale.set(1,1)
                break
            case "W":
            case "ARROWUP":
                this.yspeed = -4
                break
            case "S":
            case "ARROWDOWN":
                this.yspeed = 4
                break
        }



    }


    private onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                break;
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0
                break
        }
    }
    
        keepInScreen() {
            if (this.getBounds().left > this.game.pixi.screen.right) {
    
                this.x = -this.getBounds().width
    
            }
          
        }
       

    update(delta: number) {
        this.x += this.xspeed * delta
        this.y += this.yspeed * delta

        this.keepInScreen()
        
    
    }

}


