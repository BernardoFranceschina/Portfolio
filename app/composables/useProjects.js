export const useProjects = () => {
  const projects = [
    {
      id: "psico",
      image: "/psico/psico_image.png",
      second_image: "/psico/psico_dev.png",
      architecture_image: "/psico/psico_architecture.png",
      color: "bg-[#1a1a1c]",
      tags: ["Laravel", "Vue.js", "Pinia", "Vuetify", "MySQL"],
      year: "2026",
      company: "Freelance"
    },
    {
      id: "iase",
      image: "/iase/iase_image.png",
      second_image: "/iase/iase_dev.png",
      architecture_image: "/iase/iase_architecture.png",
      color: "bg-[#0f172a]",
      tags: ["Docker", "Nginx", "Vue.js", "Django", "MQTT", "CI/CD"],
      year: "2024 - 2026",
      company: "UFSC / Renault / Horse",
    },
    {
      id: "odonto",
      image: "/odonto/odonto_image.jpg",
      second_image: "/odonto/odonto_dev.png",
      architecture_image: "/odonto/odonto_architecture.png",
      color: "bg-[#271a1a]",
      tags: ["Laravel", "Vue.js", "Docker", "PostgreSQL", "WebSocket", "AWS"],
      year: "2021 - 2022",
      company: "D3T Inovação Tecnológica"
    },
    {
      id: "ndpz",
      image: "/ndpz/ndpz_image.png",
      second_image: "/ndpz/ndpz_dev.png",
      architecture_image: "/ndpz/ndpz_architecture.png",
      color: "bg-[#1a1a1c]",
      tags: ["Laravel", "Vue.js", "Sanity.io", "Asaas Integration", "CRM"],
      year: "2022 - 2026",
      company: "Freelance"
    },
  ]

  return { projects }
}