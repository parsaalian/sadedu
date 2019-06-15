import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import App from "/imports/ui/App";
import { LocaleProvider } from "antd";

import faIR from "antd/lib/locale-provider/fa_IR";

Meteor.startup(() => {
  render(<LocaleProvider locale={faIR}><App /></LocaleProvider>, document.getElementById("react-target"));
});
