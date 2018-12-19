import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ApiService{

    private selectedPlayer = new Subject<any>();
    playerSelected = this.selectedPlayer.asObservable();

    constructor(private http: HttpClient, private router: Router){}

    getPlayers(){
        return this.http.get('https://localhost:44362/api/players');
    }

    getPlayersByPlayerId(playerId){
        return this.http.get(`https://localhost:44362/api/players/${playerId}`);
    }

    postPlayer(player){
        this.http.post('https://localhost:44362/api/players', player).subscribe(res=>{
            console.log(res)
            this.router.navigate(["/"])
        });

    }

    putPlayer(player){
        this.http.put(`https://localhost:44362/api/players/${player.playerId}`, player).subscribe(res=>{
             console.log(res);
             this.reload('player');
        });
      
    }

    deletePlayer(playerId){
        this.http.delete(`https://localhost:44362/api/players/${playerId}`).subscribe(res=>{
            console.log(res);
            this.reload('player');
        });
    }

    selectPlayer(player){
        this.selectedPlayer.next(player);
    }

    reload(component){
        this.router.navigateByUrl(`/${component}`, {skipLocationChange: true}).then(()=>
        this.router.navigate(["/"])); 
    }
}