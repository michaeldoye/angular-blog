import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { LocalStorageService } from 'angular-2-local-storage/dist/local-storage.service';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtml } from '@angular/platform-browser/src/security/dom_sanitization_service';

declare let marked: any;
declare let hljs: any;

@Injectable()
export class PostsService {

  postsRef: AngularFireObject<any>;
  user: any = this.ls.get('user');

  previewHtml: any;

  constructor(
    private db: AngularFireDatabase,
    private ls: LocalStorageService,
    private _domSanitizer: DomSanitizer) { 

    this.postsRef = db.object(`users/${this.user.uid}`);
  }

  getPosts(): Observable<any> {
    return this.postsRef.valueChanges().map((data: any) => data.posts);
  }

  getCategories(): Observable<any> {
    return this.postsRef.valueChanges().map((data: any) => data.categories)
  }

  getTags(): Observable<any> {
    return this.postsRef.valueChanges().map((data: any) => data.tags)
  }

  renderContent(_content: any): SafeHtml {

    let _markedRender = new marked.Renderer();
    _markedRender.code = (code: any, language: any) => {
      let validLang = !!(language && hljs.getLanguage(language));
      let highlighted = validLang ? hljs.highlight(language, code).value : code;
      return `<pre style="padding: 0; border-radius: 0;"><code class="hljs ${language}">${highlighted}</code></pre>`;
    };

    _markedRender.table = (header: string, body: string) => {
      return `<table class="table table-bordered">\n<thead>\n${header}</thead>\n<tbody>\n${body}</tbody>\n</table>\n`;
    };

    _markedRender.listitem = (text: any) => {
      if (/^\s*\[[x ]\]\s*/.test(text)) {
        text = text
          .replace(/^\s*\[ \]\s*/, '<i class="fa fa-square-o" style="margin: 0 0.2em 0.25em -1.6em;"></i> ')
          .replace(/^\s*\[x\]\s*/, '<i class="fa fa-check-square" style="margin: 0 0.2em 0.25em -1.6em;"></i> ');
        return `<li style="list-style: none;">${text}</li>`;
      } else {
        return `<li>${text}</li>`;
      }
    };

    let _markedOpt = {
      renderer: _markedRender,
      highlight: (code: any) => hljs.highlightAuto(code).value
    };

    let html = marked(_content, _markedOpt);

    return this._domSanitizer.bypassSecurityTrustHtml(html);
  }

}
