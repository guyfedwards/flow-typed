import { Slate } from "slate";
import * as Immutable from "immutable";
import * as React from "react";

declare module "slate-react" {
  declare interface RenderAttributes {
    [key: string]: any;
  }
  declare interface RenderMarkProps {
    attributes: RenderAttributes;
    children: React.ReactNode;
    editor: Editor;
    mark: Slate.Mark;
    marks: Immutable.Set<Slate.Mark>;
    node: Slate.Node;
    offset: number;
    text: string;
  }
  declare interface RenderNodeProps {
    attributes: RenderAttributes;
    children: React.ReactNode;
    editor: Editor;
    isSelected: boolean;
    key: string;
    node: Slate.Block;
    parent: Slate.Node;
  }
  declare interface Plugin {
    onBeforeInput?: (
      event: Event,
      change: Slate.Change,
      editor: Editor
    ) => Slate.Change | void;
    onBlur?: (
      event: Event,
      change: Slate.Change,
      editor: Editor
    ) => Slate.Change | void;
    onFocus?: (
      event: Event,
      change: Slate.Change,
      editor: Editor
    ) => Slate.Change | void;
    onClick?: (
      event: Event,
      change: Slate.Change,
      editor: Editor
    ) => Slate.Change | void;
    onCopy?: (
      event: Event,
      change: Slate.Change,
      editor: Editor
    ) => Slate.Change | void;
    onCut?: (
      event: Event,
      change: Slate.Change,
      editor: Editor
    ) => Slate.Change | void;
    onDrop?: (
      event: Event,
      change: Slate.Change,
      editor: Editor
    ) => Slate.Change | void;
    onKeyDown?: (
      event: Event,
      change: Slate.Change,
      editor: Editor
    ) => Slate.Change | void;
    onKeyUp?: (
      event: Event,
      change: Slate.Change,
      editor: Editor
    ) => Slate.Change | void;
    onPaste?: (
      event: Event,
      change: Slate.Change,
      editor: Editor
    ) => Slate.Change | void;
    onSelect?: (
      event: Event,
      change: Slate.Change,
      editor: Editor
    ) => Slate.Change | void;
    onChange?: (change: Slate.Change) => any;
    renderEditor?: (
      props: RenderAttributes,
      editor: Editor
    ) => { [any]: any } | void;
    schema?: Slate.Schema;
    decorateNode?: (node: Slate.Node) => Slate.Range[] | void;
    renderMark?: (props: RenderMarkProps) => any;
    renderNode?: (props: RenderNodeProps) => any;
    renderPlaceholder?: (props: RenderAttributes) => any;
    renderPortal?: (props: RenderAttributes) => any;
    validateNode?: (node: Node) => any;
  }
  declare interface BasicEditorProps {
    value: Slate.Value;
    autoCorrect?: boolean;
    autoFocus?: boolean;
    className?: string;
    onChange?: (change: Slate.Change) => any;
    placeholder?: any;
    plugins?: Plugin[];
    readOnly?: boolean;
    role?: string;
    schema?: Slate.Schema;
    spellCheck?: boolean;
    style?: {
      [key: string]: string
    };
    tabIndex?: number;
  }
  declare type EditorProps = BasicEditorProps & Plugin;
  declare interface EditorState {
    schema: Slate.Schema;
    value: Slate.Value;
    stack: Slate.Stack;
  }
  declare export class Editor extends React.Component<
    EditorProps,
    EditorState
  > {
    schema: Slate.Schema;
    value: Slate.Value;
    stack: Slate.Stack;
    blur(): void;
    change(fn: (change: Slate.Change) => any): void;
    change(...args: any[]): void;
    focus(): void;
  }
  declare type SlateType =
    | "fragment"
    | "html"
    | "node"
    | "rich"
    | "text"
    | "files";

  declare export function findDOMNode(node: Slate.Node): Element;
  declare export function findDOMRange(range: Slate.Range): Range;
  declare export function findNode(
    element: Element,
    value: Slate.Value
  ): Slate.Node;
  declare export function findRange(
    selection: Selection,
    value: Slate.Value
  ): Slate.Range;
  declare export function getEventRange(
    event: Event,
    value: Slate.Value
  ): Slate.Range;
  declare export function getEventTransfer(
    event: Event
  ): {
    type: SlateType,
    node: Slate.Node
  };
  declare export function setEventTransfer(
    event: Event,
    type: SlateType,
    data: any
  ): void;
}
