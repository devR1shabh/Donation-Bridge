import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarClock, MapPin, Package, Salad, Sparkles } from "lucide-react";
import api, { getApiError } from "../api/axios";
import PageHeader from "../components/PageHeader";
import StatusMessage from "../components/StatusMessage";
import { useToast } from "../context/ToastContext";

const initialForm = {
  foodName: "",
  quantity: "",
  pickupBy: "",
  location: "",
};

const MotionForm = motion.form;

export default function CreateDonation() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

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

    if (!form.foodName.trim() || !form.quantity.trim() || !form.location.trim()) {
      setError("Please complete food name, quantity, pickup time, and location.");
      return;
    }

    if (new Date(form.pickupBy) <= new Date()) {
      setError("Pickup time must be in the future.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/donation/create", {
        ...form,
        pickupBy: new Date(form.pickupBy).toISOString(),
      });
      setForm(initialForm);
      setMessage("Donation created successfully.");
      showToast("Donation created and made available to NGOs.", "success");
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="create-page">
      <PageHeader
        eyebrow="Restaurant workflow"
        title="Post a food donation"
        description="Add precise donation details so NGOs can make a confident claim quickly."
      />
      <div className="create-layout">
        <MotionForm
          onSubmit={handleSubmit}
          className="form content-panel"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label>
            Food name
            <span className="input-shell">
              <Salad size={18} />
              <input
                type="text"
                name="foodName"
                value={form.foodName}
                onChange={handleChange}
                placeholder="Fresh vegetable meals"
                required
              />
            </span>
          </label>
          <label>
            Quantity
            <span className="input-shell">
              <Package size={18} />
              <input
                type="text"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="20 plates"
                required
              />
            </span>
          </label>
          <label>
            Pickup by
            <span className="input-shell">
              <CalendarClock size={18} />
              <input
                type="datetime-local"
                name="pickupBy"
                value={form.pickupBy}
                onChange={handleChange}
                required
              />
            </span>
          </label>
          <label>
            Pickup location
            <span className="input-shell">
              <MapPin size={18} />
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Kitchen address or pickup point"
                required
              />
            </span>
          </label>
          <StatusMessage type="success">{message}</StatusMessage>
          <StatusMessage type="error">{error}</StatusMessage>
          <button className="button primary full" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create donation"}
          </button>
        </MotionForm>

        <aside className="guidance-panel">
          <Sparkles size={24} />
          <h2>Make the listing easy to claim</h2>
          <p>
            Clear quantities, realistic pickup times, and recognizable pickup
            locations help NGOs decide faster and avoid missed collections.
          </p>
          <img
            src="https://images.unsplash.com/photo-1605522561233-768ad7a8fabf?auto=format&fit=crop&w=900&q=80"
            alt="Prepared food donation boxes"
          />
        </aside>
      </div>
    </section>
  );
}
