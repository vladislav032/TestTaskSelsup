import React, { useState } from 'react';

interface Param {
  id: number;
  name: string;
  type: 'string' | 'number';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors?: string[];
}

interface Props {
  params: Param[];
  model: Model;
}

const ParamEditor: React.FC<Props> = ({ params, model }) => {
  const [paramValues, setParamValues] = useState(model.paramValues || []);

  const handleChange = (paramId: number, value: string) => {
    setParamValues((prevValues) =>
      prevValues.some((p) => p.paramId === paramId)
        ? prevValues.map((p) => (p.paramId === paramId ? { ...p, value } : p))
        : [...prevValues, { paramId, value }]
    );
  };

  const getModel = (): Model => ({ paramValues });

  return (
    <div>
      <h2>Редактор параметров</h2>
      <form>
        {params.map(({ id, name }) => (
          <div key={id}>
            <label>{name}:</label>
            <input
              type="text"
              value={paramValues.find((p) => p.paramId === id)?.value || ''}
              onChange={(e) => handleChange(id, e.target.value)}
            />
          </div>
        ))}
      </form>
      <button onClick={() => console.log(getModel())}>Получить Model</button>
    </div>
  );
};

const params: Param[] = [
  { id: 1, name: 'Назначение', type: 'string' },
  { id: 2, name: 'Длина', type: 'string' },
  { id: 3, name: 'Число', type: 'number' }
];

const model: Model = {
  paramValues: [
    { paramId: 1, value: 'повседневное' },
    { paramId: 2, value: 'макси' }
  ]
};

export const App: React.FC = () => <ParamEditor params={params} model={model} />;
