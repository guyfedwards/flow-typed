import * as Immutable from "immutable";

declare module "slate" {
  declare interface Data {
    [key: string]: any;
  }
  declare interface RulesByNodeType {
    [key: string]: Rules;
  }
  declare interface KindsAndTypes {
    kinds?: string[];
    types?: string[];
  }
  declare type InvalidReason =
    | "child_kind_invalid"
    | "child_required"
    | "child_type_invalid"
    | "child_unknown"
    | "first_child_kind_invalid"
    | "first_child_type_invalid"
    | "last_child_kind_invalid"
    | "last_child_type_invalid"
    | "node_data_invalid"
    | "node_is_void_invalid"
    | "node_mark_invalid"
    | "node_text_invalid"
    | "parent_kind_invalid"
    | "parent_type_invalid";
  declare interface Rules {
    data?: {
      [key: string]: (v: any) => boolean
    };
    first?: KindsAndTypes;
    isVoid?: boolean;
    last?: KindsAndTypes;
    nodes?: Array<{
      kinds?: string[],
      types?: string[],
      min?: number,
      max?: number
    }>;
    normalize?: (
      change: Change,
      reason: InvalidReason,
      context: {
        [key: string]: any
      }
    ) => void;
    parent?: KindsAndTypes;
    text?: RegExp;
  }
  declare interface SchemaProperties {
    document?: Rules;
    blocks?: RulesByNodeType;
    inlines?: RulesByNodeType;
  }
  declare class Schema extends Immutable.Record {
    document: Rules;
    blocks: RulesByNodeType;
    inlines: RulesByNodeType;
    create(properties: SchemaProperties | Schema): Schema;
    fromJSON(object: SchemaProperties): Schema;
    isSchema(maybeSchema: any): boolean;
    toJSON(): SchemaProperties;
  }
  declare interface ValueProperties {
    document?: Document<DataMap>;
    selection?: Range;
    history?: History;
    schema?: Schema;
    data?: Data;
    decorations?: Immutable.List<Range> | null;
  }
  declare interface ValueJSON {
    document?: DocumentJSON;
    selection?: Range;
    history?: History;
    schema?: Schema;
    data?: Data;
    decorations?: Immutable.List<Range> | null;
    object?: "value";
  }
  declare class Value extends Immutable.Record {
    document: Document<DataMap>;
    selection: Range;
    history: History;
    schema: Schema;
    data: Data;
    object: "NO PRINT IMPLEMENTED: LiteralType";
    decorations: Immutable.List<Range> | null;
    anchorText: Text;
    focusText: Text;
    startText: Text;
    endText: Text;
    anchorBlock: Block;
    focusBlock: Block;
    startBlock: Block;
    endBlock: Block;
    marks: Immutable.Set<Mark>;
    activeMarks: Immutable.Set<Mark>;
    blocks: Immutable.List<Block>;
    fragment: Document<DataMap>;
    inlines: Immutable.List<Inline>;
    text: Immutable.List<Text>;
    characters: Immutable.List<Character>;
    hasUndos: boolean;
    hasRedos: boolean;
    anchorKey: string;
    focusKey: string;
    startKey: string;
    endKey: string;
    anchorOffset: number;
    focusOffset: number;
    startOffset: number;
    endOffset: number;
    isBackward: boolean;
    isBlurred: boolean;
    isCollapsed: boolean;
    isExpanded: boolean;
    isFocused: boolean;
    isForward: boolean;
    create(properties?: ValueProperties | Value): Value;
    fromJSON(properties: ValueJSON): Value;
    isValue(maybeValue: any): boolean;
    change(): Change;
    toJSON(): ValueJSON;
  }
  declare interface DocumentProperties {
    nodes?: Immutable.List<Node> | Node[];
    key?: string;
    data?:
      | Immutable.Map<string, any>
      | {
          [key: string]: any
        };
  }
  declare interface DocumentJSON {
    nodes?: NodeJSON[];
    key?: string;
    data?: {
      [key: string]: any
    };
    object?: "document";
  }
  declare class Document<DataMap> extends BaseNode<DataMap> {
    object: "document";
    nodes: Immutable.List<Block>;
    create(
      properties:
        | DocumentProperties
        | Document<DataMap>
        | Immutable.List<Node>
        | Node[]
    ): Document<DataMap>;
    fromJSON(
      properties: DocumentProperties | Document<DataMap>
    ): Document<DataMap>;
    isDocument(maybeDocument: any): boolean;
    toJSON(): DocumentJSON;
  }
  declare interface BlockProperties {
    type: string;
    key?: string;
    nodes?: Immutable.List<Node>;
    isVoid?: boolean;
    data?:
      | Immutable.Map<string, any>
      | {
          [key: string]: any
        };
  }
  declare interface BlockJSON {
    type: string;
    key?: string;
    nodes?: NodeJSON[];
    isVoid?: boolean;
    data?: {
      [key: string]: any
    };
    object: "block";
  }
  declare class Block extends BaseNode<DataMap> {
    isVoid: boolean;
    object: "block";
    nodes: Immutable.List<Block | Text | Inline>;
    create(properties: BlockProperties | Block | string): Block;
    createList(
      array: BlockProperties[] | Block[] | string[]
    ): Immutable.List<Block>;
    fromJSON(properties: BlockProperties | Block): Block;
    isBlock(maybeBlock: any): boolean;
    toJSON(): BlockJSON;
  }
  declare interface InlineProperties {
    type: string;
    key?: string;
    nodes?: Immutable.List<Node>;
    isVoid?: boolean;
    data?:
      | Immutable.Map<string, any>
      | {
          [key: string]: any
        };
  }
  declare interface InlineJSON {
    type: string;
    key?: string;
    nodes?: NodeJSON[];
    isVoid?: boolean;
    data?: {
      [key: string]: any
    };
    object: "inline";
  }
  declare class Inline extends BaseNode<DataMap> {
    isVoid: boolean;
    object: "inline";
    nodes: Immutable.List<Inline | Text>;
    create(properties: InlineProperties | Inline | string): Inline;
    createList(
      array: InlineProperties[] | Inline[] | string[]
    ): Immutable.List<Inline>;
    fromJSON(properties: InlineProperties | Inline): Inline;
    isInline(maybeInline: any): boolean;
    toJSON(): InlineJSON;
  }
  declare interface Leaf {
    marks?: Mark[];
    text: string;
  }
  declare interface TextProperties {
    key?: string;
    characters: Immutable.List<Character>;
  }
  declare interface TextJSON {
    key?: string;
    characters?: Character[];
    leaves: Leaf[];
    object: "text";
  }
  declare class Text extends Immutable.Record {
    object: "text";
    characters: Immutable.List<Character>;
    key: string;
    text: string;
    create(properties: TextProperties | Text | string): Text;
    fromJSON(properties: TextProperties | Text): Text;
    isText(maybeText: any): boolean;
    toJSON(): TextJSON;
  }
  declare type Node = Document<DataMap> | Block | Inline | Text;
  declare type NodeJSON = DocumentJSON | BlockJSON | InlineJSON | TextJSON;
  declare type DataMap = { [string]: any };
  declare class BaseNode<DataMap> extends Immutable.Record {
    data: Immutable.Map<$Keys<DataMap>, any>;
    type: string;
    key: string;
    +object: "document" | "block" | "inline" | "text";
    nodes: Immutable.List<Node>;
    text: string;
    filterDescendants(iterator: (node: Node) => boolean): Immutable.List<Node>;
    findDescendants(iterator: (node: Node) => boolean): Node | null;
    getBlocksAtRange(range: Range): Immutable.List<Block>;
    getBlocks(): Immutable.List<Block>;
    getCharactersAtRange(range: Range): Immutable.List<Character>;
    getChild(key: string | Node): Node | null;
    getClosestBlock(key: string | Node): Block | null;
    getClosestInline(key: string | Node): Inline | null;
    getClosest(key: string | Node, match: (node: Node) => boolean): Node | null;
    getDepth(key: string | Node): number;
    getDescendant(key: string | Node): Node | null;
    getFirstText(): Text | null;
    getFragmentAtRange(range: Range): Document<DataMap>;
    getFurthest(key: string, iterator: (node: Node) => boolean): Node | null;
    getFurthestAncestor(key: string): Node | null;
    getFurthestBlock(key: string): Block | null;
    getFurthestInline(key: string): Inline | null;
    getFurthestOnlyChildAncestor(key: string): Node | null;
    getInlinesAtRange(range: Range): Immutable.List<Inline>;
    getLastText(): Text | null;
    getMarksAtRange(range: Range): Immutable.Set<Mark>;
    getNextBlock(key: string | Node): Block | null;
    getNextSibling(key: string | Node): Node | null;
    getNextText(key: string | Node): Text | null;
    getParent(key: string | Node): Node | null;
    getPreviousBlock(key: string | Node): Block | null;
    getPreviousSibling(key: string | Node): Node | null;
    getPreviousText(key: string | Node): Text | null;
    getTexts(): Immutable.List<Text>;
    getTextsAsArray(): Text[];
    getTextAtOffset(offset: number): Text | null;
    getTextsAtRange(range: Range): Immutable.List<Text>;
    getTextsAtRangeAsArray(range: Range): Text[];
    hasChild(key: string | Node): boolean;
  }
  declare interface CharacterProperties {
    marks?: Immutable.Set<Mark> | Mark[];
    text: string;
  }
  declare class Character extends Immutable.Record {
    object: "character";
    marks: Immutable.Set<Mark>;
    text: string;
    create(properties: CharacterProperties | Character | string): Character;
    createList(
      array: CharacterProperties[] | Character[] | string[]
    ): Immutable.List<Character>;
    fromJSON(properties: CharacterProperties | Character): Character;
    isCharacter(maybeCharacter: any): boolean;
    toJSON(): CharacterProperties;
  }
  declare interface MarkProperties {
    type: string;
    data?:
      | Immutable.Map<string, any>
      | {
          [key: string]: any
        };
  }
  declare interface MarkJSON {
    type: string;
    data?: {
      [key: string]: any
    };
  }
  declare class Mark extends Immutable.Record {
    object: "mark";
    type: string;
    data: Immutable.Map<string, any>;
    create(properties: MarkProperties | Mark | string): Mark;
    createSet(array: MarkProperties[] | Mark[] | string[]): Immutable.Set<Mark>;
    fromJSON(properties: MarkJSON | Mark): Mark;
    isMark(maybeMark: any): boolean;
    toJSON(): MarkProperties;
  }
  declare class Change extends Immutable.Record {
    object: "change";
    value: Value;
    operations: Immutable.List<Operation>;
    call(customChange: (change: Change, ...args: any[]) => Change): Change;
    applyOperations(operations: Operation[]): Change;
    applyOperation(operation: Operation): Change;
    setValue(properties: Value | ValueProperties): Change;
    deleteBackward(n: number): Change;
    deleteForward(n: number): Change;
    delete(): Change;
    insertBlock(block: Block | BlockProperties | string): Change;
    insertFragment(fragment: Document<DataMap>): Change;
    insertInline(inline: Inline | InlineProperties): Change;
    insertText(text: string): Change;
    addMark(mark: Mark | MarkProperties | string): Change;
    setBlocks(properties: BlockProperties | string): Change;
    setInlines(properties: InlineProperties | string): Change;
    splitBlock(depth: number): Change;
    splitInline(depth: number): Change;
    removeMark(mark: Mark | MarkProperties | string): Change;
    toggleMark(mark: Mark | MarkProperties | string): Change;
    unwrapBlock(properties: BlockProperties | string): Change;
    unwrapInline(properties: InlineProperties | string): Change;
    wrapBlock(properties: BlockProperties | string): Change;
    wrapInline(properties: InlineProperties | string): Change;
    wrapText(prefix: string, suffix?: string): Change;
    blur(): Change;
    collapseToAnchor(): Change;
    collapseToFocus(): Change;
    collapseToStart(): Change;
    collapseToEnd(): Change;
    collapseToStartOf(node: Node): Change;
    collapseToEndOf(node: Node): Change;
    collapseToStartOfNextBlock(): Change;
    collapseToEndOfNextBlock(): Change;
    collapseToStartOfPreviousBlock(): Change;
    collapseToEndOfPreviousBlock(): Change;
    collapseToStartOfNextText(): Change;
    collapseToEndOfNextText(): Change;
    collapseToStartOfPreviousText(): Change;
    collapseToEndOfPreviousText(): Change;
    extend(n: number): Change;
    extendToStartOf(node: Node): Change;
    extendToEndOf(node: Node): Change;
    flip(): Change;
    focus(): Change;
    move(n: number): Change;
    moveStart(n: number): Change;
    moveEnd(n: number): Change;
    moveOffsetsTo(anchorOffset: number, focusOffset: number): Change;
    moveToRangeOf(node: Node): Change;
    select(properties: Range | RangeProperties): Change;
    selectAll(): Change;
    deselect(): Change;
    deleteBackwardAtRange(range: Range, n: number): Change;
    deleteForwardAtRange(range: Range, n: number): Change;
    deleteAtRange(range: Range): Change;
    insertBlockAtRange(
      range: Range,
      block: Block | BlockProperties | string
    ): Change;
    insertFragmentAtRange(range: Range, fragment: Document<DataMap>): Change;
    insertInlineAtRange(
      range: Range,
      inline: Inline | InlineProperties
    ): Change;
    insertTextAtRange(range: Range, text: string): Change;
    addMarkAtRange(range: Range, mark: Mark | MarkProperties | string): Change;
    setBlocksAtRange(
      range: Range,
      properties: BlockProperties | string
    ): Change;
    setInlinesAtRange(
      range: Range,
      properties: InlineProperties | string
    ): Change;
    splitBlockAtRange(range: Range, depth: number): Change;
    splitInlineAtRange(range: Range, depth: number): Change;
    removeMarkAtRange(
      range: Range,
      mark: Mark | MarkProperties | string
    ): Change;
    toggleMarkAtRange(
      range: Range,
      mark: Mark | MarkProperties | string
    ): Change;
    unwrapBlockAtRange(
      range: Range,
      properties: BlockProperties | string
    ): Change;
    unwrapInlineAtRange(
      range: Range,
      properties: InlineProperties | string
    ): Change;
    wrapBlockAtRange(
      range: Range,
      properties: BlockProperties | string
    ): Change;
    wrapInlineAtRange(
      range: Range,
      properties: InlineProperties | string
    ): Change;
    wrapTextAtRange(range: Range, prefix: string, suffix?: string): Change;
    addMarkByKey(
      key: string,
      offset: number,
      length: number,
      mark: Mark
    ): Change;
    insertNodeByKey(key: string, index: number, node: Node): Change;
    insertFragmentByKey(
      key: string,
      index: number,
      fragment: Document<DataMap>
    ): Change;
    insertTextByKey(
      key: string,
      offset: number,
      text: string,
      marks?: Immutable.Set<Mark> | Mark[]
    ): Change;
    moveNodeByKey(key: string, newKey: string, newIndex: number): Change;
    removeMarkByKey(
      key: string,
      offset: number,
      length: number,
      mark: Mark
    ): Change;
    removeNodeByKey(key: string): Change;
    replaceNodeByKey(key: string, node: Node): Change;
    removeTextByKey(key: string, offset: number, length: number): Change;
    setMarkByKey(
      key: string,
      offset: number,
      length: number,
      mark: Mark,
      properties: MarkProperties
    ): Change;
    setNodeByKey(
      key: string,
      properties: BlockProperties | InlineProperties | string
    ): Change;
    splitNodeByKey(key: string, offset: number): Change;
    unwrapInlineByKey(
      key: string,
      properties: InlineProperties | string
    ): Change;
    unwrapBlockByKey(key: string, properties: BlockProperties | string): Change;
    unwrapNodeByKey(key: string): Change;
    wrapInlineByKey(key: string, properties: InlineProperties | string): Change;
    wrapBlockByKey(key: string, properties: BlockProperties | string): Change;
    redo(): Change;
    undo(): Change;
  }
  declare interface RangeProperties {
    anchorKey?: string | null;
    anchorOffset?: number;
    focusKey?: string | null;
    focusOffset?: number;
    isFocused?: boolean;
    isBackward?: boolean | null;
    marks?: Immutable.Set<Mark> | null;
  }
  declare interface RangeJSON {
    anchorKey?: string | null;
    anchorOffset?: number;
    focusKey?: string | null;
    focusOffset?: number;
    isFocused?: boolean;
    isBackward?: boolean | null;
    marks?: MarkJSON[] | null;
  }
  declare class Range extends Immutable.Record {
    object: "range";
    anchorKey: string | null;
    anchorOffset: number;
    focusKey: string | null;
    focusOffset: number;
    isFocused: boolean;
    isBackward: boolean | null;
    marks: Immutable.Set<Mark> | null;
    isBlurred: boolean;
    isCollapsed: boolean;
    isExpanded: boolean;
    isForward: boolean;
    startKey: string;
    startOffset: number;
    endKey: string;
    endOffset: number;
    create(properties: RangeProperties | Range): Range;
    fromJSON(properties: RangeJSON): Range;
    isRange(maybeRange: any): boolean;
    toJSON(): RangeProperties;
    hasAnchorAtStartOf(node: Node): boolean;
    hasFocusAtStartOf(node: Node): boolean;
    hasStartAtStartOf(node: Node): boolean;
    hasEndAtStartOf(node: Node): boolean;
    hasEdgeAtStartOf(node: Node): boolean;
    hasAnchorAtEndOf(node: Node): boolean;
    hasFocusAtEndOf(node: Node): boolean;
    hasStartAtEndOf(node: Node): boolean;
    hasEndAtEndOf(node: Node): boolean;
    hasEdgeAtEndOf(node: Node): boolean;
    hasAnchorBetween(node: Node, start: number, end: number): boolean;
    hasFocusBetween(node: Node, start: number, end: number): boolean;
    hasStartBetween(node: Node, start: number, end: number): boolean;
    hasEndBetween(node: Node, start: number, end: number): boolean;
    hasEdgeBetween(node: Node, start: number, end: number): boolean;
    hasAnchorIn(node: Node): boolean;
    hasFocusIn(node: Node): boolean;
    hasStartIn(node: Node): boolean;
    hasEndIn(node: Node): boolean;
    hasEdgeIn(node: Node): boolean;
    isAtStartOf(node: Node): boolean;
    isAtEndOf(node: Node): boolean;
  }
  declare type Operation =
    | InsertTextOperation
    | RemoveTextOperation
    | AddMarkOperation
    | RemoveMarkOperation
    | SetMarkOperation
    | InsertNodeOperation
    | MergeNodeOperation
    | MoveNodeOperation
    | RemoveNodeOperation
    | SetNodeOperation
    | SplitNodeOperation
    | SetSelectionOperation
    | SetValueOperation;
  declare interface InsertTextOperation {
    type: "insert_text";
    path: number[];
    offset: number;
    text: string;
    marks: Mark[];
  }
  declare interface RemoveTextOperation {
    type: "remove_text";
    path: number[];
    offset: number;
    text: string;
  }
  declare interface AddMarkOperation {
    type: "add_mark";
    path: number[];
    offset: number;
    length: number;
    mark: Mark;
  }
  declare interface RemoveMarkOperation {
    type: "remove_mark";
    path: number[];
    offset: number;
    length: number;
    mark: Mark;
  }
  declare interface SetMarkOperation {
    type: "set_mark";
    path: number[];
    offset: number;
    length: number;
    mark: Mark;
    properties: MarkProperties;
  }
  declare interface InsertNodeOperation {
    type: "insert_node";
    path: number[];
    node: Node;
  }
  declare interface MergeNodeOperation {
    type: "merge_node";
    path: number[];
    position: number;
  }
  declare interface MoveNodeOperation {
    type: "move_node";
    path: number[];
    newPath: number[];
  }
  declare interface RemoveNodeOperation {
    type: "remove_node";
    path: number[];
    node: Node;
  }
  declare interface SetNodeOperation {
    type: "set_node";
    path: number[];
    properties: BlockProperties | InlineProperties | TextProperties;
  }
  declare interface SplitNodeOperation {
    type: "split_node";
    path: number[];
    position: number;
    target: number;
  }
  declare interface SetSelectionOperation {
    type: "set_selection";
    properties: RangeProperties;
    selection: Range;
  }
  declare interface SetValueOperation {
    type: "set_value";
    properties: ValueProperties;
    value: Value;
  }
  declare var Operations: {
    apply: (value: Value, operation: Operation) => Value,
    invert: (operation: Operation) => Operation
  };
  declare class Stack extends Immutable.Record {
    plugins: any[];
  }
  declare function setKeyGenerator(func: () => string): null;

  declare function resetKeyGenerator(): null;
}
