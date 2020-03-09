import React, { Component } from "react";
import { WidgetModel } from "../models/widget";

interface Props {
  index: number;
  widget: WidgetModel;
  currencies: string[];
  onDelete: (index: number) => void;
}
interface State {}

class Widget extends Component<Props, State> {
  state = {};

  render() {
    return <div>widget</div>;
  }
}

export default Widget;
