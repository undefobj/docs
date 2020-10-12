import {Component, h, Prop, Host, State} from "@stencil/core";
import docs from "@aws-amplify/ui-components/dist/docs";
import {JsonDocsComponent, JSXBase} from "@stencil/core/internal";
import {tableGeneratorMap} from "./table-generator";
import {PropType} from "./ui-component-props.types";

const headerNames: Record<PropType, string> = {
  attr: "Properties",
  css: "Custom CSS Properties",
  slots: "Slots",
};

@Component({tag: "ui-component-props", shadow: false})
export class DocsUIComponentProps {
  /*** component tag for documented component page */
  @Prop() readonly tag: string;
  /*** whether or not the table contains header tags */
  @Prop() readonly useTableHeaders: boolean = false;
  /** Desired property to document */
  @Prop() readonly propType: PropType = "attr";

  @State() component: JsonDocsComponent | undefined;

  componentWillLoad() {
    this.component = docs.components.find(
      (component) => component.tag === this.tag,
    );
  }

  header() {
    const sectionId = `props-${this.propType}-${this.component?.tag as string}`;
    return this.useTableHeaders ? (
      <docs-in-page-link targetId={sectionId}>
        <h2 id={sectionId}>{headerNames[this.propType]}</h2>
      </docs-in-page-link>
    ) : (
      <h4>Properties</h4>
    );
  }

  content() {
    let explanation: string = "";
    if (this.propType === "attr") {
      explanation =
        "provides the following properties to configure the component.";
    } else if (this.propType === "css") {
      const link = (
        <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">
          css properties
        </a>
      );
      explanation = `provides the following ${link} to modify the style at component level.`;
    } else if (this.propType === "slots") {
      const link = (
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot">
          Web Components slot element
        </a>
      );
      explanation = `provides the following slots based off of the ${link}.`;
    }
    return (
      <p>
        <code>{this.component?.tag}</code> {explanation}
      </p>
    );
  }

  render() {
    console.log(this.propType)
    if (!this.component || !this.component.tag) return;
    const tableGenerator = tableGeneratorMap[this.propType];
    return (
      <Host>
        {this.header()}
        {this.content()}
        {tableGenerator(this.component)}
      </Host>
    );
  }
}
