import { Component, OnInit, AfterViewInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { ApiService } from '../services/api.services'
import { Skills } from '../interfaces/skills.interface'
import { Player } from '../interfaces/player.interface'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import {Guid} from "guid-typescript"


@Component({
    selector: 'player',
    templateUrl: './player.component.html'
})


export class PlayerComponent implements OnInit, AfterViewInit{
    playerForm: FormGroup;
    player: Player;
    selectedSkill;
    playerId;
    skillsLevel: Skills[] = [
        {value: '1', viewValue: 'Beginner'},
        {value: '2', viewValue: 'Intermediate'},
        {value: '3', viewValue: 'Advanced'},
        {value: '4', viewValue: 'Expert'}
      ];

    constructor(private api: ApiService,
        private route: ActivatedRoute,
        private fb: FormBuilder) {}

    ngOnInit() {
        this.playerForm = this.fb.group({
            playerId: [''],
            firstName: [''],
            lastName: [''],
            age: [''],
            skillLevel: [null],
            email: [null, Validators.required],
        });

        var selectedPlayerid = this.route.snapshot.paramMap.get('playerId');
        if(selectedPlayerid){
            this.api.getPlayersByPlayerId(selectedPlayerid).subscribe(res => {
                this.player = <Player>res;
                const toSelect = this.skillsLevel.find(s => s.value == this.player.skillLevel.toString());
                
                this.playerId = this.player.playerId;
                this.playerForm.get('playerId').setValue(this.player.playerId);
                this.playerForm.get('firstName').setValue(this.player.firstName);
                this.playerForm.get('lastName').setValue(this.player.lastName);
                this.playerForm.get('age').setValue(this.player.age);
                this.playerForm.get('email').setValue(this.player.email);
                this.playerForm.get('skillLevel').setValue(toSelect);
            });
        }
    }

    ngAfterViewInit(){
       
    }

    post(player){
        player.playerId = Guid.createEmpty().toString();
        this.api.postPlayer(player);
    }
}