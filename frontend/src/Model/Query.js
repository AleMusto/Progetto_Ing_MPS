import { gql } from '@apollo/client';

export const getPatterns = gql`
query getPatterns {
  patterns(pagination: {limit: -1}) {
    data {
      id
      attributes {
        titolo
        strategias {
          data {
            attributes {
              nome
            }
          }
        }
        collocazione_mvcs {
          data {
            attributes {
              nome
            }
          }
        }
        fase_isos {
          data {
            attributes {
              nome
            }
          }
        }
        articolo_gdprs {
          data {
            attributes {
              nome
              link
            }
          }
        }
        principio_pbds {
          data {
            attributes {
              nome
            }
          }
        }
        categoria_owasps {
          data {
            attributes {
              nome
            }
          }
        }
        cwe_associata_a_categoria_owasps {
          data {
            attributes {
              nome
            }
          }
        }
      }
    }
  }
}
`;

export const getPatternsBuffer = gql`
query getPatternsBuffer {
  patternBuffers(pagination: {limit: -1}) {
    data {
      id
      attributes {
        titolo
        strategias {
          data {
            attributes {
              nome
            }
          }
        }
        collocazione_mvcs {
          data {
            attributes {
              nome
            }
          }
        }
        fase_isos {
          data {
            attributes {
              nome
            }
          }
        }
        articolo_gdprs {
          data {
            attributes {
              nome
              link
            }
          }
        }
        principio_pbds {
          data {
            attributes {
              nome
            }
          }
        }
        categoria_owasps {
          data {
            attributes {
              nome
            }
          }
        }
        cwe_associata_a_categoria_owasps {
          data {
            attributes {
              nome
            }
          }
        }
        user {
          data {
            attributes {
              username
            }
          }
        }
        stato {
          data {
            attributes {
              nome
            }
          }
        }
      }
    }
  }
}
`;