import {Component, OnInit} from '@angular/core';
import {User} from '../models/user.model';
import {UserService} from '../services/user.service';
import {Storage} from '@ionic/storage';
import {Skill} from '../models/skill.model';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.page.html',
    styleUrls: ['./skills.page.scss'],
})
export class SkillsPage implements OnInit {

    public currentUser = new User();
    public currentSkillText: string;

    constructor(private userService: UserService, private storage: Storage) {
    }

    ngOnInit() {
        this.storage.get('currentUserEmail').then((currentUserEmail) => {
            this.userService.getUsers().subscribe(data => {
                data.map(e => {
                    return {id: e.payload.doc.id, ...e.payload.doc.data()} as User;
                }).forEach(value => {
                    if (value.email === currentUserEmail) {
                        this.currentUser = value;
                    }
                });
            });
        });
    }

    addSkill() {
        this.currentUser.skills.push({name: this.currentSkillText, level: 0} as Skill);
        this.userService.updateUser(this.currentUser);
        this.currentSkillText = '';
    }

    removeSkill(i) {
      this.currentUser.skills.splice(i, 1);
      this.userService.updateUser(this.currentUser);
    }

}
