import { environment } from '../../environments/environment';
import { globalVars } from '../globalVars';
import { Measure } from '../models/measure';

export class Piece {
    pieceComposer:string;
    pieceName:string;
    userName:string;
    pieceMeasures: Array<Measure>

    constructor(composer:string, name:string, measures: Array<Measure>, userName: string) {
        this.pieceComposer = composer;
        this.pieceName = name;
        this.pieceMeasures = measures;
        this.userName = userName;
    }
}