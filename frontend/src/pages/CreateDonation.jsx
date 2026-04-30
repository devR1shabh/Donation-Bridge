import { useState } from "react";
import api, { getApiError } from "../api/axios";
import StatusMessage from "../components/StatusMessage";

const initialForm = {
  foodName: "",
  quantity: "",
  pickupBy: "",
  location: "",
};

export default function CreateDonation() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await api.post("/donation/create", {
        ...form,
        pickupBy: new Date(form.pickupBy).toISOString(),
      });
      setForm(initialForm);
      setMessage("Donation created successfully.");
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="content-panel">
      <h1>Create Donation</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Food name
          <input
            type="text"
            name="foodName"
            value={form.foodName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Quantity
          <input
            type="text"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="20 plates"
            required
          />
        </label>
        <label>
          Pickup by
          <input
            type="datetime-local"
            name="pickupBy"
            value={form.pickupBy}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Location
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          />
        </label>
        <StatusMessage type="success">{message}</StatusMessage>
        <StatusMessage type="error">{error}</StatusMessage>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create donation"}
        </button>
      </form>
    </section>
  );
}
