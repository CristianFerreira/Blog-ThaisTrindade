
export class Post {
        public _id: string;
        public title: string;
        public description: string;
        public date: Date;
        public category: string;
        public author: number;
        public continent: string;
        public country: string;
        public state: string;
        public city: string;
        public tags: Array<string>;
        public active: Boolean;
        public updateDate: Boolean;
        
        constructor() {
            this.tags = new Array<string>();
        }
}