import {v4 as uuidv4} from 'uuid';
import firebase from 'firebase';
import {PathogenSequence} from "./PathogenSequence";

const sha1 = require('sha1');

export class Pathogen
{
  id: string = uuidv4();
  commonName: string = "";
  scientificName: string = "";
  family: string = "";
  viralFactor: string = "";
  clinicalSymptoms: string = "";
  tags: [string] = [""];
  sequenceId: string = "";
  sequenceLength: number = 0;
  sequenceSHA1: string = "";
  created: Date = new Date();
  updated: Date = new Date();

  static fromUserData(commonName: string, scientificName: string, family: string, viralFactor: string, clinicalSymptoms: string, tags: [string], sequence: string)
  {
    const pathogen = new Pathogen();

    pathogen.commonName = commonName;
    pathogen.scientificName = scientificName;
    pathogen.family = family;
    pathogen.viralFactor = viralFactor;
    pathogen.clinicalSymptoms = clinicalSymptoms;
    pathogen.tags = tags;
    if (sequence) {
      pathogen.sequenceLength = sequence.length;
      pathogen.sequenceSHA1 = sha1(sequence);
      const pathogenSequence = new PathogenSequence();
      pathogenSequence.pathogenID = pathogen.id;
      pathogenSequence.sequence = sequence;
      pathogenSequence.persist();
    }


    return pathogen;

  }

  toJson() //create a persistable json representation of the object.
  {
    return {
      id: this.id, commonName: this.commonName, scientificName: this.scientificName, family: this.family, viralFactor: this.viralFactor, clinicalSymptoms: this.clinicalSymptoms, tags: this.tags, sequenceId: this.sequenceId, sequenceLength: this.sequenceLength, sequenceSHA1: this.sequenceSHA1, created: this.created, updated: this.updated,
    }
  }

  persist()
  {
    const data = this.toJson();
    data.updated = new Date();
    firebase.firestore().collection('pathogens').doc(this.id).set(data).then(res => console.log("persist complete", res));
  }


}



