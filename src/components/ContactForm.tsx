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
import { useTranslations } from "next-intl";

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
  const t = useTranslations("ContactForm");
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
      newErrors.name = t("errName");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("errEmailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("errEmailInvalid");
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t("errSubject");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("errMessageRequired");
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t("errMessageMin");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

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
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSubmitted(true);

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
          {t("successTitle")}
        </h3>
        <p className="text-gray-300 mb-6">{t("successText")}</p>
        <button type="button" onClick={() => setIsSubmitted(false)} className="btn-punk">
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-white font-semibold mb-2">
          {t("name")} *
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
            placeholder={t("namePlaceholder")}
          />
        </div>
        {errors.name && (
          <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.name}</span>
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-white font-semibold mb-2">
          {t("email")} *
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
            placeholder={t("emailPlaceholder")}
          />
        </div>
        {errors.email && (
          <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-white font-semibold mb-2"
        >
          {t("subject")} *
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
          <option value="">{t("subjectPlaceholder")}</option>
          <option value="colaboracion">{t("subjectCollaboration")}</option>
          <option value="concierto">{t("subjectConcert")}</option>
          <option value="prensa">{t("subjectPress")}</option>
          <option value="general">{t("subjectGeneral")}</option>
          <option value="otro">{t("subjectOther")}</option>
        </select>
        {errors.subject && (
          <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.subject}</span>
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-white font-semibold mb-2"
        >
          {t("message")} *
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
            placeholder={t("messagePlaceholder")}
          />
        </div>
        {errors.message && (
          <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.message}</span>
          </p>
        )}
        <p className="text-gray-400 text-xs mt-1">
          {t("minChars", { count: formData.message.length })}
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-2">{t("privacyTitle")}</h4>
        <p className="text-gray-400 text-sm">{t("privacyText")}</p>
      </div>

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
            <span>{t("sending")}</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>{t("send")}</span>
          </>
        )}
      </button>

      <div className="text-center pt-4 border-t border-gray-800">
        <p className="text-gray-400 text-sm">
          {t("prefersEmail")}{" "}
          <a
            href="mailto:contact@kaosekaitza.com"
            className="text-red-500 hover:text-red-400"
          >
            contact@kaosekaitza.com
          </a>
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
