import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { AuthService } from  '../auth/auth.service';
import { CrudService } from '../shared/crud.service';

import MediumEditor from 'medium-editor';

import { Entry } from '../shared/entry';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  editor: any;
  @ViewChild('container', {static: true}) container: ElementRef;

  constructor(
    private authService: AuthService,
    private crudApi: CrudService,
  ) { }

  ngOnInit(): void {
    const subscription = this.crudApi.entryRef.valueChanges().subscribe(data => {
      if (data) {
        this.editor.elements[0].innerHTML = data.html;
        this.editor.elements[0].focus();
        subscription.unsubscribe();
      }
    })
  }

  ngAfterViewInit() {
    let that = this;
    const element = this.container.nativeElement;
    this.editor = new MediumEditor(element);
    this.editor.subscribe('editableInput', function (event, editable) {
      that.crudApi.write({
        html: editable.innerHTML
      })
    });
  }

}
