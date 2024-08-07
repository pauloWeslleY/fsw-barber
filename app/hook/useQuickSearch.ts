interface QuickSearchOptions {
  imageUrl: string
  title: string
}

const useQuickSearch = () => {
  const quickSearchOptions: QuickSearchOptions[] = [
    { title: "Cabelo", imageUrl: "/tesoura.svg" },
    { title: "Barba", imageUrl: "/barba.svg" },
    { title: "Acabamento", imageUrl: "/acabamento.svg" },
    { title: "Massagem", imageUrl: "/massagem.svg" },
    { title: "Sobrancelha", imageUrl: "/sobrancelha.svg" },
    { title: "Hidratação", imageUrl: "/hidratacao.svg" },
  ]

  return { quickSearchOptions }
}

export default useQuickSearch
