import './QuestionOptions.css';

interface QuestionOptionsProps {
  options: string[];
  onSelect: (option: string) => void;
  disabled: boolean;
}

export const QuestionOptions = ({ options, onSelect, disabled }: QuestionOptionsProps) => {
  return (
    <div className="question-options">
      {options.map((option, index) => (
        <button
          key={index}
          className="option-button"
          onClick={() => onSelect(option)}
          disabled={disabled}
        >
          <span className="option-text">{option}</span>
          <span className="option-arrow">→</span>
        </button>
      ))}
    </div>
  );
};
