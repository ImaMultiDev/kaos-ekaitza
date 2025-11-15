"use client";

import { useState } from "react";
import {
  Send,
  User,
  Mail,
  MessageSquare,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "El asunto es requerido";
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Aquí iría la lógica para enviar el formulario a la API
      // Simulamos una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted:", formData);
      setIsSubmitted(true);

      // Limpiar formulario
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-900/20 border border-green-500 rounded-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-4">
          ¡Mensaje Enviado!
        </h3>
        <p className="text-gray-300 mb-6">
          Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos
          lo antes posible.
        </p>
        <button onClick={() => setIsSubmitted(false)} className="btn-punk">
          Enviar Otro Mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nombre */}
      <div>
        <label htmlFor="name" className="block text-white font-semibold mb-2">
          Nombre *
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full pl-12 pr-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors duration-300 ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-700 focus:ring-red-600 focus:border-red-600"
            }`}
            placeholder="Tu nombre completo"
          />
        </div>
        {errors.name && (
          <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.name}</span>
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-white font-semibold mb-2">
          Email *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full pl-12 pr-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors duration-300 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-700 focus:ring-red-600 focus:border-red-600"
            }`}
            placeholder="tu@email.com"
          />
        </div>
        {errors.email && (
          <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      {/* Asunto */}
      <div>
        <label
          htmlFor="subject"
          className="block text-white font-semibold mb-2"
        >
          Asunto *
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-gray-900 border rounded-lg text-white focus:outline-none focus:ring-2 transition-colors duration-300 ${
            errors.subject
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-700 focus:ring-red-600 focus:border-red-600"
          }`}
        >
          <option value="">Selecciona un asunto</option>
          <option value="colaboracion">Colaboración Musical</option>
          <option value="concierto">Solicitud de Concierto</option>
          <option value="prensa">Consulta de Prensa</option>
          <option value="general">Consulta General</option>
          <option value="otro">Otro</option>
        </select>
        {errors.subject && (
          <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.subject}</span>
          </p>
        )}
      </div>

      {/* Mensaje */}
      <div>
        <label
          htmlFor="message"
          className="block text-white font-semibold mb-2"
        >
          Mensaje *
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className={`w-full pl-12 pr-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors duration-300 resize-vertical ${
              errors.message
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-700 focus:ring-red-600 focus:border-red-600"
            }`}
            placeholder="Escribe tu mensaje aquí..."
          />
        </div>
        {errors.message && (
          <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.message}</span>
          </p>
        )}
        <p className="text-gray-400 text-xs mt-1">
          Mínimo 10 caracteres. Actual: {formData.message.length}
        </p>
      </div>

      {/* Información adicional */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-2">
          Política de Privacidad
        </h4>
        <p className="text-gray-400 text-sm">
          Respetamos tu privacidad. La información que nos proporciones será
          utilizada únicamente para responder a tu consulta y no será compartida
          con terceros.
        </p>
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full btn-punk flex items-center justify-center space-x-2 ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Enviando...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Enviar Mensaje</span>
          </>
        )}
      </button>

      {/* Información de contacto alternativa */}
      <div className="text-center pt-4 border-t border-gray-800">
        <p className="text-gray-400 text-sm">
          ¿Prefieres escribirnos directamente? Envía un email a{" "}
          <a
            href="mailto:imanol@kaosekaitza.com"
            className="text-red-500 hover:text-red-400"
          >
            imanol@kaosekaitza.com
          </a>
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
