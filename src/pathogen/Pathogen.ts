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
  viralFactor: number = 0;
  clinicalSymptoms: string = "";
  tags: [string] = [""];
  sequenceId: string = "";
  sequenceLength: number = 0;
  sequenceSHA1: string = "";
  created: Date = new Date();
  updated: Date = new Date();

  static fromFirestore(docData: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> | undefined)
  {
    const pathogen = new Pathogen();
    if (!docData) {
      return pathogen;
    }
    const data = docData.data();
    if (!data) return pathogen;

    pathogen.id = docData.id;
    pathogen.commonName = data.commonName;
    pathogen.scientificName = data.scientificName;
    pathogen.family = data.family;
    pathogen.viralFactor = data.viralFactor;
    pathogen.clinicalSymptoms = data.clinicalSymptoms;
    pathogen.tags = data.tags;
    pathogen.sequenceId = data.sequenceId;
    pathogen.sequenceSHA1 = data.tags;
    pathogen.sequenceLength = data.tags;
    pathogen.created = data.created?.toDate();
    pathogen.updated = data.updated?.toDate();
    return pathogen;

  }

  static fromUserData(commonName: string, scientificName: string, family: string, viralFactor: number, clinicalSymptoms: string, tags: [string], sequence: string)
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

  async persist()
  {
    const data = this.toJson();
    data.updated = new Date();
    return firebase.firestore().collection('pathogens').doc(this.id).set(data)
  }


}



