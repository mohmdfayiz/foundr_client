import { Label, Radio } from "flowbite-react";
import React, { useState } from "react";

function RadioQuestion({ question }) {

  const [selectedValue, setSelectedValue] = useState(null);
  const handleSelect = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <h4 className="font-bold">{question.question}</h4>
      {Q.subText && (
        <p className="text-xs text-gray-400">
          We can help you find others interested in finding a co-founder.
        </p>
      )}
      {Q.choices.map((C) => (
        <div className="flex items-center gap-2">
          <Radio
            id={C.name + C.value}
            name={C.name}
            value={C.value}
            checked={selectedValue === C.value}
            onChange={handleSelect}
          />
          <Label htmlFor={C.name + C.value}>{C.text}</Label>
        </div>
      ))}
    </div>
  );
}

export default RadioQuestion;
