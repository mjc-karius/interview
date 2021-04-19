import {v4 as uuidv4} from 'uuid';
import firebase from 'firebase';
 //the sequence itself, represented as a string
export class PathogenSequence
{
  id: string = uuidv4();
  pathogenID: string = "";
  sequence: string = "";

  created: Date = new Date();
  updated: Date = new Date();


  toJson() //create a persistable json representation of the object.
  {
    return {
      id: this.id, pathogenID: this.pathogenID, sequence: this.sequence, created: this.created, updated: this.updated,
    }
  }

  async persist()
  {
    const data = this.toJson();
    data.updated = new Date();
    return firebase.firestore().collection('pathogenSequences').doc(this.id).set(data);
  }


}



