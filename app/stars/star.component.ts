import { Component, OnChanges, Input, Output, EventEmitter } from 'angular2/core'

@Component({
    selector: "ai-star",
    templateUrl: 'app/stars/star.component.html'

})

export class StarComponent implements OnChanges{
    @Input() rating:number;
    startWidth: number;
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

    ngOnChanges(): void{
        this.startWidth = this.rating * 86/5;
    }
    onclick(): void{
        this.ratingClicked.emit(`The rating ${this.rating} was clicked`)
    }

}