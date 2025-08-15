import "./Slider.css";

export const Slider = ({
  checked,
  onChange,
}: {
  checked?: boolean;
  onChange?: (v: boolean) => void;
}) => {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="slider" />
    </label>
  );
};
