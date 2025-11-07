import React from 'react';
import { Tag, Smartphone, Headset } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Tag,
    title: "Meilleurs prix garantis",
    description: "Nous comparons les prix des agences pour vous offrir les tarifs les plus bas du marché."
  },
  {
    icon: Smartphone,
    title: "Paiement mobile facile",
    description: "Payez en toute sécurité avec Airtel Money ou MTN MoMo directement depuis votre téléphone."
  },
  {
    icon: Headset,
    title: "Support client 24/7",
    description: "Notre équipe est disponible à tout moment pour répondre à vos questions et vous assister."
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Pourquoi choisir BusCongo ?</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">L'expérience de voyage que vous méritez.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="text-center p-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-sky-100 dark:bg-sky-900/50 rounded-full">
                <feature.icon className="w-8 h-8 text-sky-600 dark:text-sky-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
