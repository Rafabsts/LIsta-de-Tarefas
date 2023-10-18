import React, { useState, useEffect } from 'react';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [tarefasInput, setTarefasInput] = useState('');

  useEffect(() => {
    const storedTarefas = localStorage.getItem('Tarefas');
    if (storedTarefas) {
      setTarefas(JSON.parse(storedTarefas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('Tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  const addTarefa = () => {
    if (tarefasInput.trim() !== '') {
      setTarefas([...tarefas, { text: tarefasInput, completed: false }]);
      setTarefasInput(''); // Limpar o campo de entrada após adicionar a tarefa
    }
  };

  const toggleTarefa = (index) => {
    const updatedTarefas = [...tarefas];
    updatedTarefas[index].completed = !updatedTarefas[index].completed;
    setTarefas(updatedTarefas);
  };

  const deleteTarefa = (index) => {
    const updatedTarefas = tarefas.filter((_, i) => i !== index);
    setTarefas(updatedTarefas);
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <input
        type="text"
        value={tarefasInput}
        onChange={(e) => setTarefasInput(e.target.value)}
        placeholder="Adicionar uma tarefa"
      />
      <button onClick={addTarefa}>Adicionar</button>
      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={tarefa.completed}
              onChange={() => toggleTarefa(index)}
            />
            <span className={tarefa.completed ? 'completed' : ''}>
              {tarefa.text}
            </span>
            <button onClick={() => deleteTarefa(index)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;








