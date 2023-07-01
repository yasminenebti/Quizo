import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TopicModel } from 'src/app/models/topic-model';
import { TopicService } from 'src/app/services/topic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-topics',
  templateUrl: './add-topics.component.html',
  styleUrls: ['./add-topics.component.css']
})
export class AddTopicsComponent {

  topicForm : FormGroup

  topicRequest = {
    name :"",
    description : ""
  }
  constructor(
    private topicService :TopicService,
    private router : Router
  ) {

    this.topicForm = new FormGroup({
      name : new FormControl("" , [Validators.required]),
      description : new FormControl("" , [Validators.required])
    })

    
  }

  addTopic(){
    this.topicRequest.name = this.topicForm.get('name')?.value;
    this.topicRequest.description = this.topicForm.get('description')?.value

    this.topicService.addNewTopic(this.topicRequest).subscribe({
      next : (response : any) => {
        Swal.fire(response.name + " is added successfully")
        this.topicForm.reset()
        this.router.navigate(["/admin/topics"])
      
      } , 
      error : (error) => {
        Swal.fire(error)
      }
    })
  }

}
