import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticateDataService } from '../../services/authenticate-data.service';
import { PostDataService } from '../../services/post-data.service';
import { Author } from '../../models/api/author';
import { Post } from '../../models/api/post';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [AuthenticateDataService, PostDataService]
})
export class PostComponent implements OnInit {

  public form: FormGroup;
  public author: Author;
  public post: Post;
  public btnConfiguracao: boolean;

  constructor(private fb: FormBuilder, private authenticateService: AuthenticateDataService, private postService: PostDataService, 
              private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(40),
        Validators.required,
      ])],
      description: ['', Validators.compose([
        Validators.minLength(4),
        Validators.required
      ])],
      category: ['', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(40),
        Validators.required
      ])],
      continent: ['', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(40),
      ])],
      country: ['', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(40),
      ])],
      state: ['', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(40),
      ])],
      city: ['', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(40),
      ])],
      tags: [''],
      btnConfiguracao: ['']
    });
    this.post = new Post();
    this.author = this.authenticateService.contextoLogado();
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (id != null)
        this.getPostById(id);
    });
  }

  ngOnInit() {
  }

  getPostById(id: number) {
    this.postService.getById(id)
      .subscribe(result => {
        this.post = <Post>result.json().data;
      }, error => {

      });
  }

  submit() {
    if(this.post.tags.length > 0){
      this.post.tags = this.post.tags.map((tag) => {
          let tagPost = <any>tag;         
          return tagPost.value ? tagPost.value : tagPost;
      })
    }

    if (!this.post._id)
      this.create();
    else
      this.update();
  }

  create() {
    this.post.author = this.author.id;
    this.postService.create(this.post)
      .subscribe(result => {
        this.router.navigateByUrl('/');
      });
  }

  update() {
    this.post.author = this.author.id;
    this.postService.update(this.post)
      .subscribe(result => {
        this.router.navigateByUrl('/');
      });
  }



}
