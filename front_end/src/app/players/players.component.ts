import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.services';
import { ModalService } from '../services/modal.service';
import { Skills } from '../interfaces/skills.interface';


@Component({
    selector: 'players',
    templateUrl: './players.component.html'
})

export class PlayersComponent implements OnInit, AfterViewInit{

    player = {};
    playerId;
    players;

    skillsLevel: Skills[] = [
        {value: '1', viewValue: 'Beginner'},
        {value: '2', viewValue: 'Intermediate'},
        {value: '3', viewValue: 'Advanced'},
        {value: '4', viewValue: 'Expert'}
      ];

    constructor(private api: ApiService, private router: Router,
        private modalService: ModalService){}

    ngOnInit(){
        this.api.getPlayers().subscribe(res=>{
            this.players = res;
        }); 
    }

    ngAfterViewInit(){
        this.closeModal("delete_dialog");
    }

    deletePlayer(player){
        var playerId = player.playerId ? player.playerId : this.playerId;
        this.api.deletePlayer(playerId);
    }

    openModal(id: string, playerId) {
        this.playerId = playerId;
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    displaySkillLevel(level){
        return this.skillsLevel.find(s => s.value == level).viewValue;
    }
}