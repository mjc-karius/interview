import React, {useState} from "react";
import {Col, Form} from "react-bootstrap";

interface SequenceFileInputProps
{
  setSequenceCallback: (seq: string) => void;
}

//reads in a file, extracts the sequence ( text) , and passes it to a parent component via a callback (setSequenceCallback).
const SequenceFileInput = ({setSequenceCallback}: SequenceFileInputProps) =>
{
  let fileReader: FileReader;
  const [sequence, setSequence] = useState<string>();

  const handleFileRead = () =>
  {
    const content = fileReader.result as string;
    if (content) {
      //validate content to come later
      setSequence(content);
      setSequenceCallback(content);
    }
  };

  const handleFileChosen = (file: Blob) =>
  {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };


  return (<>

    <Form.Row>
      <Form.Group as={Col} xs={12} controlId="viralFactor">
        <Form.Label>Sequence File</Form.Label>
        <Form.File
        id={'sequenceFile'}
        accept={'.txt'}

        onChange={(e: any) => handleFileChosen(e?.target?.files?.length ? e?.target?.files[0] : new Blob())}

        />

        {sequence && <span><strong>Length: </strong> {sequence.length}</span>}
      </Form.Group>


    </Form.Row>

  </>)
}

export {SequenceFileInput}
