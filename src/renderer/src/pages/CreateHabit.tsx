import { FormEvent, FunctionComponent, useState } from "react";

interface CreateHabitsProps {}

const CreateHabits: FunctionComponent<CreateHabitsProps> = () => {
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await window.api.criarHabito(nome, descricao);
      setSuccess(true);
      setNome("");
      setDescricao("");
    } catch (err: any) {
      setError(err?.message || "Erro ao cadastrar hábito");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-8 bg-gray-900 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-green-400 mb-2 text-center">
          Cadastrar novo hábito
        </h1>
        <label className="flex flex-col gap-1 text-gray-200">
          Nome do hábito
          <input
            className="p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1 text-gray-200">
          Descrição (opcional)
          <textarea
            className="p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
          disabled={loading}
        >
          {loading ? "Salvando..." : "Cadastrar"}
        </button>
        {error && <div className="text-red-400 text-center">{error}</div>}
        {success && (
          <div className="text-green-400 text-center">
            Hábito cadastrado com sucesso!
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateHabits