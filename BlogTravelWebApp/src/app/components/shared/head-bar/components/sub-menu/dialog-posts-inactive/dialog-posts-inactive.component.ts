import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { PostDataService } from '../../../../../../services/post-data.service';
import { Post } from '../../../../../../models/api/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-posts-inactive',
  templateUrl: './dialog-posts-inactive.component.html',
  styleUrls: ['./dialog-posts-inactive.component.css'],
  providers: [PostDataService]
})
export class DialogPostsInactiveComponent {

  public posts: Array<Post>;

  constructor(public dialogRef: MatDialogRef<DialogPostsInactiveComponent>, private postDataService: PostDataService, private router: Router) {
    this.getPostsInactive();
   }

  getPostsInactive() {
    this.postDataService.getInactive().subscribe(result => {
      this.posts = <Array<Post>>result.json();
    }, error => {
      
    });
  }

  pageEditPost(id: string) {
    this.router.navigateByUrl('post-create/' + id);
    this.dialogRef.close();
  }

}
