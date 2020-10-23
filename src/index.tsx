import React from "react";
import {Tag} from "./components/Tag";
import {classSelectors} from "./utils/selectors";

type Tags = string[];

export interface ReactTagInputProps {
  id?: string;
  tags: Tags;
  onChange: (tags: Tags) => void;
  placeholder?: string;
  maxTags?: number;
  validator?: (val: string) => boolean;
  editable?: boolean;
  readOnly?: boolean;
  removeOnBackspace?: boolean;
  delimiters?: number[];
  required?: boolean;
}

interface State {
  input: string;
}

export default class ReactTagInput extends React.Component<ReactTagInputProps, State> {

  state = { input: "" };

  // Ref for input element
  inputRef: React.RefObject<HTMLInputElement> = React.createRef();
  
  onWrapperClick = () => {
    this.inputRef.current?.focus()
  }

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { placeholder } = this.props;
    this.inputRef.current?.setAttribute("size", placeholder?.length.toString()!)
    this.setState({ input: e.target.value });
  }

  onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

    const { input } = this.state;
    const { validator, removeOnBackspace, delimiters = [9, 13, 188, 32] } = this.props;

    //Check if alt + tab was hit to onfocus element
    if(e.keyCode === 9 && e.altKey) {
      this.inputRef.current?.blur();
    }
    // Check if default Enter or one of the delimiter keys was hit
    else if (e.keyCode === 13 || delimiters?.includes(e.keyCode)) {

      // Prevent form submission if tag input is nested in <form>
      e.preventDefault();

      // If input is blank, do nothing
      if (input === "") { return; }

      // Check if input is valid
      const valid = validator !== undefined ? validator(input) : true;
      if (!valid) {
        return;
      }

      // Add input to tag list
      this.addTag(input);

    }
    // On backspace or delete
    else if (removeOnBackspace && (e.keyCode === 8 || e.keyCode === 46)) {

      // If currently typing, do nothing
      if (input !== "") {
        return;
      }

      // If input is blank, remove previous tag
      this.removeTag(this.props.tags.length - 1);

    }

  }

  onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {

    // Cancel paste event
    e.preventDefault();

    // Remove formatting from clipboard contents
    const text = e.clipboardData.getData("text/plain");

    const splitText = text.split(/[ ,\n\r\t\v\f\0]+/)
    
    //If a list with spaces or commas is pasted, each item will be a tag
    const tags = [ ...this.props.tags ];
    splitText.map((tag) => {
      if (!tags.includes(tag) && tag !== "") {
        tags.push(tag);
      }
    })
    this.props.onChange(tags);
  }

  addTag = (value: string) => {
    const tags = [ ...this.props.tags ];
    if (!tags.includes(value)) {
      tags.push(value);
      this.props.onChange(tags);
    }
    this.setState({ input: "" });
  }

  removeTag = (i: number) => {
    const tags = [ ...this.props.tags ];
    tags.splice(i, 1);
    this.props.onChange(tags);
  }

  updateTag = (i: number, value: string) => {
    const tags = [...this.props.tags];
    const numOccurencesOfValue = tags.reduce((prev, currentValue, index) => prev + (currentValue === value && index !== i ? 1 : 0) , 0);
    if (numOccurencesOfValue > 0) {
      tags.splice(i, 1);
    } else {
      tags[i] = value;
    }
    this.props.onChange(tags);
  }

  render() {

    const { input } = this.state;

    const { id, tags, placeholder = "Type and press enter", maxTags, editable, readOnly, validator, removeOnBackspace, delimiters, required = false } = this.props;

    const maxTagsReached = maxTags !== undefined ? tags.length >= maxTags : false;

    const isEditable = readOnly ? false : (editable || false);

    const showInput = !readOnly && !maxTagsReached;

    return (
      <div id={id ? `${id}-wrapper` : ''} className={classSelectors.wrapper} onClick={this.onWrapperClick}>
        {tags.map((tag, i) => (
          <Tag
            key={i}
            value={tag}
            index={i}
            editable={isEditable}
            readOnly={readOnly || false}
            inputRef={this.inputRef}
            update={this.updateTag}
            remove={this.removeTag}
            validator={validator}
            removeOnBackspace={removeOnBackspace}
            delimiters={delimiters}
          />
        ))}
        {showInput &&
          <input id={id} 
            ref={this.inputRef}
            value={input}
            className={classSelectors.input}
            placeholder={placeholder}
            onChange={this.onInputChange}
            onKeyDown={this.onInputKeyDown}
            onPaste={this.onPaste}
            required={required}
          />
        }
      </div>
    );

  }

}
