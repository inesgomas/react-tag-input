import React from "react";
import {classSelectors} from "../utils/selectors";
import {ContentEditable} from "./ContentEditable";

interface Props {
  value: string;
  index: number;
  editable: boolean;
  readOnly: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  update: (i: number, value: string) => void;
  remove: (i: number) => void;
  validator?: (val: string) => boolean;
  removeOnBackspace?: boolean;
  delimiters?: number[];
}

export const CloseIcon = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.146447 0.146447C0.341709 -0.0488155 0.658291 -0.0488155 0.853553 0.146447L7.85355 7.14645C8.04882 7.34171 8.04882 7.65829 7.85355 7.85355C7.65829 8.04882 7.34171 8.04882 7.14645 7.85355L0.146447 0.853553C-0.0488155 0.658291 -0.0488155 0.341709 0.146447 0.146447Z" fill="#7E90B2"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.85355 0.146447C8.04882 0.341709 8.04882 0.658291 7.85355 0.853553L0.853553 7.85355C0.658291 8.04882 0.341709 8.04882 0.146447 7.85355C-0.0488155 7.65829 -0.0488155 7.34171 0.146447 7.14645L7.14645 0.146447C7.34171 -0.0488155 7.65829 -0.0488155 7.85355 0.146447Z" fill="#7E90B2"/>
  </svg>
)

export class Tag extends React.Component<Props> {

  innerEditableRef: React.RefObject<HTMLDivElement> = React.createRef();

  remove = () => this.props.remove(this.props.index);

  render() {

    const { value, index, editable, inputRef, validator, update, removeOnBackspace, delimiters } = this.props;

    return (
      <div className={classSelectors.tag}>
        {!editable && <div className={classSelectors.tagContent}>{value}</div>}
        {editable && (
          <ContentEditable
            value={value}
            inputRef={inputRef}
            innerEditableRef={this.innerEditableRef}
            className={classSelectors.tagContent}
            change={(newValue) => update(index, newValue)}
            remove={this.remove}
            validator={validator}
            removeOnBackspace={removeOnBackspace}
            delimiters={delimiters}
          />
        )}
        <div className={classSelectors.tagRemove} onClick={this.remove}>
          <CloseIcon/>
        </div>
      </div>
    );

  }

}
