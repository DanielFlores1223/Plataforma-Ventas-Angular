import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-chat-facebook',
  templateUrl: './chat-facebook.component.html',
  styleUrls: ['./chat-facebook.component.css']
})
export class ChatFacebookComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function() {
      $(".chat-button").on('click', function(e) {
          e.preventDefault();
          $(".chat-content").slideToggle("fast");
      });
  });
  }
  }


