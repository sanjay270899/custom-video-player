import ReactGA from "react-ga";

export const GAevent = props => {
  const { category, action, label, value } = props;
  ReactGA.event({
    category,
    action,
    label,
    value
  });
};
