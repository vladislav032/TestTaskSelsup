import React, { useState } from 'react';

interface Param {
  id: number;
  name: string;
  type: 'string';
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
  const [showModal, setShowModal] = useState(false);

  const handleChange = (paramId: number, value: string) => {
    setParamValues((prevValues) =>
      prevValues.some((p) => p.paramId === paramId)
        ? prevValues.map((p) => (p.paramId === paramId ? { ...p, value } : p))
        : [...prevValues, { paramId, value }]
    );
  };

  const getModel = (): Model => {
    return { paramValues };
  };

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
        <button onClick={() => { console.log(getModel()); setShowModal(true); }}>
            Показать Model
        </button>


      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
            <h3>Модель параметров</h3>
            <table border={1}>
              <thead>
                <tr>
                  <th>ID параметра</th>
                  <th>Название</th>
                  <th>Значение</th>
                </tr>
              </thead>
              <tbody>
                {paramValues.map(({ paramId, value }) => (
                  <tr key={paramId}>
                    <td>{paramId}</td>
                    <td>{params.find(p => p.id === paramId)?.name || 'Неизвестно'}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => setShowModal(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

const params: Param[] = [
  { id: 1, name: 'Назначение', type: 'string' },
  { id: 2, name: 'Длина', type: 'string' },
];

const model: Model = {
  paramValues: [
    { paramId: 1, value: 'строка 1' },
    { paramId: 2, value: 'строка 2' }
  ]
};

export const App: React.FC = () => <ParamEditor params={params} model={model} />;
