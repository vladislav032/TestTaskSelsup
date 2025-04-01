import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { useState, useCallback, useMemo } from 'react';

type Param = {
  id: number;
  name: string;
  type: 'string';
};

type ParamValue = {
  paramId: number;
  value: string;
};

type Model = {
  paramValues: ParamValue[];
  colors?: string[];
};

type ParamEditorProps = {
  params?: Param[];
  model?: Model;
};

const DEFAULT_MODEL: Model = {
  paramValues: [],
  colors: [],
};

const DEFAULT_PARAMS: Param[] = [
  { id: 1, name: 'Назначение', type: 'string' },
  { id: 2, name: 'Длина', type: 'string' },
];

const ParamEditor: React.FC<ParamEditorProps> = ({ 
  params = DEFAULT_PARAMS, 
  model = DEFAULT_MODEL 
}) => {
  const [paramValues, setParamValues] = useState<ParamValue[]>(model.paramValues);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleParamChange = useCallback((paramId: number, value: string) => {
    setParamValues(prevValues => {
      const existingParamIndex = prevValues.findIndex(p => p.paramId === paramId);
      
      if (existingParamIndex >= 0) {
        const updatedValues = [...prevValues];
        updatedValues[existingParamIndex] = { ...updatedValues[existingParamIndex], value };
        return updatedValues;
      }
      
      return [...prevValues, { paramId, value }];
    });
  }, []);

  const getModel = useCallback((): Model => ({ paramValues }), [paramValues]);

  const handleShowModel = useCallback(() => {
    console.log('Current model:', getModel());
    setIsModalOpen(true);
  }, [getModel]);

  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  const paramsMap = useMemo(() => 
    params.reduce<Record<number, Param>>((acc, param) => {
      acc[param.id] = param;
      return acc;
    }, {}), 
    [params]
  );

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <header className="card-header bg-primary text-white">
          <h1 className="h5 mb-0">Редактор параметров</h1>
        </header>
        
        <div className="card-body">
          <form>
            {params.map(param => (
              <div key={param.id} className="mb-3">
                <label htmlFor={`param-${param.id}`} className="form-label">
                  {param.name}
                </label>
                <input
                  id={`param-${param.id}`}
                  type="text"
                  className="form-control"
                  value={paramValues.find(p => p.paramId === param.id)?.value ?? ''}
                  onChange={(e) => handleParamChange(param.id, e.target.value)}
                  aria-label={param.name}
                />
              </div>
            ))}
          </form>

          <button 
            type="button"
            className="btn btn-success mt-3"
            onClick={handleShowModel}
            aria-expanded={isModalOpen}
            aria-controls="model-modal"
          >
            Показать модель
          </button>
        </div>
      </div>

      <div 
        className={`modal fade ${isModalOpen ? 'show d-block' : ''}`} 
        id="model-modal"
        tabIndex={-1}
        role="dialog"
        aria-hidden={!isModalOpen}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title h5">Текущая модель параметров</h2>
              <button 
                type="button" 
                className="btn-close" 
                onClick={handleCloseModal}
                aria-label="Закрыть"
              />
            </div>
            
            <div className="modal-body">
              {paramValues.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Параметр</th>
                        <th scope="col">Значение</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paramValues.map(({ paramId, value }) => (
                        <tr key={paramId}>
                          <td>{paramId}</td>
                          <td>{paramsMap[paramId]?.name || 'Неизвестный параметр'}</td>
                          <td>
                            <code>{value}</code>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="alert alert-info mb-0">
                  Нет данных для отображения
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleCloseModal}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div 
          className="modal-backdrop fade show" 
          onClick={handleCloseModal}
        />
      )}
    </div>
  );
};

const App: React.FC = () => (
  <ParamEditor 
    params={DEFAULT_PARAMS}
    model={{
      paramValues: [
        { paramId: 1, value: 'строка 1' },
        { paramId: 2, value: 'строка 2' },
      ],
    }}
  />
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);