<template>
  <div id="standard-data-page">
    <div class="date-panel">
      <table>
        <tbody>
          <tr>
            <td class="width-100-x100 text-align-left page-title">{{ page }}</td>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <button
                        type="button"
                        class="as-icon small-icon"
                        :class="{ selected: pageMode === 'create' }"
                        v-on:click="goToCreateMode"
                      >
                        <img
                          src="@/assets/images/plus.png"
                          alt="Add"
                          class="as-icon-image"
                        />
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        class="as-icon small-icon"
                        :class="{ selected: pageMode === 'facts' }"
                        v-on:click="goToFactsMode"
                      >
                        <img
                          src="@/assets/images/eye.png"
                          alt="Facts"
                          class="as-icon-image"
                        />
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        class="as-icon small-icon"
                        :class="{ selected: pageMode === 'prototypes' }"
                        v-on:click="goToPrototypesMode"
                      >
                        <img
                          src="@/assets/images/schema.png"
                          alt="Prototypes"
                          class="as-icon-image"
                        />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- CONTENTS ON CREATE -->
      <div v-if="pageMode === 'create'">
        <div class="form-item" v-if="pageMode === 'edit'">
          <div class="form-label">
            <span>ID:</span>
            <span>{{ itemToCreate.Id }}</span>
          </div>
        </div>
        <div class="form-item">
          <div class="form-label">Type:</div>
          <div class="text-align-center">
            <span
              class="selectable-text"
              :class="{ selected: itemToCreate.asPrototype === false }"
              v-on:click="itemToCreate.asPrototype = false"
              >As fact</span
            >
            <span> or </span>
            <span
              class="selectable-text"
              :class="{ selected: itemToCreate.asPrototype === true }"
              v-on:click="itemToCreate.asPrototype = true"
              >as prototype</span
            >
            <span>?</span>
          </div>
        </div>
        <div class="form-item" v-if="typeof loadedPrototypes === 'object'">
          <div class="form-label">Parent ID (optional):</div>
          <table class="width-100-x100">
            <tbody>
              <tr>
                <td class="width-100-x100" colspan="2">
                  <input
                    class="form-input as-list-item"
                    type="text"
                    v-model="itemToCreate.parentName"
                  />
                </td>
                <td class="width-1-x100" colspan="1">
                  <button
                    type="button"
                    class="as-icon small-icon"
                    :class="{ selected: isSelectedParentPanel }"
                    v-on:click="toggleParentPanel"
                  >
                    <img
                      v-if="isSelectedParentPanel === true"
                      src="@/assets/images/up-arrow.png"
                      alt="Close parent panel"
                      class="as-icon-image"
                    />
                    <img
                      v-else
                      src="@/assets/images/down-arrow.png"
                      alt="Open parent panel"
                      class="as-icon-image"
                    />
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody
              v-if="
                isSelectedParentPanel &&
                pageToPrototypeTable in loadedPrototypes &&
                loadedPrototypes[pageToPrototypeTable].length === 0
              "
            >
              <tr>
                <td colspan="3">
                  <div class="empty-message">
                    No {{ page.toLowerCase() }} prototypes suggested.
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody
              v-else-if="
                isSelectedParentPanel &&
                !(pageToPrototypeTable in loadedPrototypes)
              "
            >
              <tr>
                <td colspan="3">
                  «{{ pageToTable }}» not in list:
                  {{ Object.keys(loadedPrototypes).join(", ") }}
                </td>
              </tr>
            </tbody>
            <tbody
              v-else-if="isSelectedParentPanel"
              v-for="(onePrototype, indexPrototype) in loadedPrototypes[
                pageToTable + '_Predefinido'
              ]"
              v-bind:key="indexPrototype"
            >
              <tr>
                <td
                  class="as-selectable width-100-x100"
                  :class="{
                    selected: selectedParentPrototype === indexPrototype,
                  }"
                  colspan="2"
                  v-on:click="selectParentPrototype(indexPrototype)"
                >
                  <span class="as-list-item">{{ onePrototype.Nombre }}</span>
                </td>
                <td colspan="1">
                  <button
                    type="button"
                    class="as-icon small-icon"
                    :class="{ selected: pageMode === 'prototypes' }"
                    v-on:click="setParentPrototype(onePrototype)"
                  >
                    <img
                      src="@/assets/images/check.png"
                      alt="Prototypes"
                      class="as-icon-image"
                    />
                  </button>
                </td>
              </tr>
              <tr v-if="selectedParentPrototype === indexPrototype">
                <td class="as-list-item" colspan="1000">
                  <div>Name: {{ onePrototype.Nombre }}</div>
                  <div>Details: {{ onePrototype.Detalles }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="form-item" v-if="itemToCreate.asPrototype === false">
          <div class="form-label">Moment:</div>
          <table class="width-100-x100" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td class="width-50-x100">
                  <input
                    type="date"
                    class="form-input"
                    v-model="itemToCreate.Fecha"
                  />
                </td>
                <td style="background: transparent; min-width: 5px"></td>
                <td class="width-50-x100">
                  <input
                    type="time"
                    class="form-input"
                    v-model="itemToCreate.Hora"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="form-item">
          <div class="form-label">Name:</div>
          <input type="text" class="form-input" v-model="itemToCreate.Nombre" />
        </div>
        <div class="form-item">
          <div class="form-label">Details (optional):</div>
          <textarea
            class="form-input"
            v-model="itemToCreate.Detalles"
          ></textarea>
        </div>
        <div class="form-item">
          <div class="form-label">Associated consequence (optional):</div>
          <div class="text-align-center">
            <button class="as-icon small-icon" v-on:click="addConsequenceItem">
              <img
                src="@/assets/images/plus.png"
                alt="Add"
                class="as-icon-image"
              />
            </button>
          </div>
          <div
            class="empty-message"
            v-if="itemToCreate.AssociatedConsequences.length === 0"
          >
            <div>No associated consequence.</div>
          </div>
          <div v-else>
            <table>
              <tbody
                v-for="(
                  consequence, indexConsequence
                ) in itemToCreate.AssociatedConsequences"
                v-bind:key="indexConsequence"
              >
                <tr>
                  <td class="width-100-x100">
                    <span v-if="consequence.destinationType && consequence.Nombre">
                      {{ consequence.destinationType }}: {{ consequence.Nombre }} [x{{
                        consequence.Intensidad
                      }}]
                    </span>
                  </td>
                  <td class="width-1-x100" v-if="indexConsequence === selectedConsequence">
                    <button
                      type="button"
                      class="as-icon small-icon"
                      v-on:click="removeConsequenceItem(indexConsequence)"
                    >
                      <img
                        src="@/assets/images/trash.png"
                        alt="Delete"
                        class="as-icon-image"
                      />
                    </button>
                  </td>
                  <td v-else></td>
                  <td class="width-1-x100">
                    <button
                      type="button"
                      class="as-icon small-icon"
                      v-on:click="toggleConsequence(indexConsequence)"
                    >
                      <img
                        v-if="indexConsequence === selectedConsequence"
                        src="@/assets/images/check.png"
                        alt="Toggle"
                        class="as-icon-image"
                      />
                      <img
                        v-else
                        src="@/assets/images/eye.png"
                        alt="Toggle"
                        class="as-icon-image"
                      />
                    </button>
                  </td>
                </tr>
                <tr v-if="indexConsequence === selectedConsequence">
                  <td class="width-100-x100" colspan="4">
                    <div class="form-item">
                      <div class="form-sublabel">Type of consequence:</div>
                      <select
                        class="form-input"
                        v-model="consequence.destinationType"
                      >
                        <option value="">-</option>
                        <option value="Food">Food</option>
                        <option value="Thought">Thought</option>
                        <option value="Movement">Movement</option>
                        <option value="Goals">Goal</option>
                      </select>
                    </div>
                    <div class="form-item" v-if="consequence.destinationType">
                      <div class="form-sublabel">
                        {{ consequence.destinationType }} consequence:
                      </div>
                      <!-- Table of prototypes suggestions in consequence: -->
                      <table class="width-100-x100">
                        <tbody>
                          <tr>
                            <td class="width-100-x100" colspan="1">
                              <input
                                class="form-input as-list-item"
                                type="text"
                                v-model="consequence.destinationName"
                              />
                            </td>
                            <td class="" colspan="2">
                              <button
                                type="button"
                                class="as-icon small-icon"
                                :class="{
                                  selected: consequence.isSelectedDestination,
                                }"
                                v-on:click="
                                  consequence.isSelectedDestination = !consequence.isSelectedDestination
                                "
                              >
                                <img
                                  v-if="consequence.isSelectedDestination === true"
                                  src="@/assets/images/up-arrow.png"
                                  alt="Close parent panel"
                                  class="as-icon-image"
                                />
                                <img
                                  v-else
                                  src="@/assets/images/down-arrow.png"
                                  alt="Open parent panel"
                                  class="as-icon-image"
                                />
                              </button>
                            </td>
                          </tr>
                        </tbody>
                        <tbody
                          v-if="
                            consequence.isSelectedDestination === true &&
                            toPrototypeTable(consequence.destinationType) in loadedPrototypes &&
                            loadedPrototypes[toPrototypeTable(consequence.destinationType)].length === 0
                          "
                        >
                          <tr>
                            <td colspan="3">
                              <div class="empty-message">
                                No {{ consequence.destinationType.toLowerCase() }} prototypes
                                suggested.
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody
                          v-else-if="
                            consequence.isSelectedDestination === true &&
                            !(toPrototypeTable(consequence.destinationType) in loadedPrototypes)
                          "
                        >
                          <tr>
                            <td colspan="3">
                              «{{ toTable(consequence.destinationType) }}» not in
                              {{ Object.keys(loadedPrototypes).join(", ") }}
                            </td>
                          </tr>
                        </tbody>
                        <tbody
                          v-else-if="consequence.isSelectedDestination === true"
                          v-for="(
                            onePrototype, indexPrototype
                          ) in loadedPrototypes[toPrototypeTable(consequence.destinationType)]"
                          v-bind:key="indexPrototype"
                        >
                          <tr>
                            <td
                              class="as-selectable width-100-x100"
                              :class="{
                                selected:
                                  consequence.selectedDestinationPrototype ===
                                  onePrototype,
                              }"
                              colspan="2"
                              v-on:click="
                                selectDestinationPrototype(
                                  onePrototype,
                                  consequence
                                )
                              "
                            >
                              <span class="as-list-item">{{
                                onePrototype.Nombre
                              }}</span>
                            </td>
                            <td colspan="1">
                              <button
                                type="button"
                                class="as-icon small-icon"
                                :class="{ selected: pageMode === 'prototypes' }"
                                v-on:click="
                                  setDestinationPrototype(
                                    onePrototype,
                                    consequence
                                  )
                                "
                              >
                                <img
                                  src="@/assets/images/check.png"
                                  alt="Prototypes"
                                  class="as-icon-image"
                                />
                              </button>
                            </td>
                          </tr>
                          <tr
                            v-if="
                              consequence.selectedDestinationPrototype ===
                              onePrototype
                            "
                          >
                            <td class="as-list-item" colspan="1000">
                              <div>Name: {{ onePrototype.Nombre }}</div>
                              <div>Details: {{ onePrototype.Detalles }}</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <!-- End of table of prototypes suggestions in consequence -->
                    </div>
                    <div
                      class="form-item"
                      v-if="
                        consequence.destinationType && consequence.destinationName
                      "
                    >
                      <div class="form-sublabel">Intensidad:</div>
                      <div>
                        <table class="width-100-x100">
                          <tbody>
                            <tr>
                              <td>
                                <button
                                  type="button"
                                  class="as-icon small-icon"
                                  v-on:click="
                                  consequence.Intensidad =
                                    consequence.Intensidad === 1
                                      ? -1
                                      : consequence.Intensidad-1
                                  "
                                >
                                  <img
                                    src="@/assets/images/minus.png"
                                    alt="Decrease intensity"
                                    class="as-icon-image"
                                  />
                                </button>
                              </td>
                              <td class="width-100-x100">
                                <input
                                  type="text"
                                  class="form-input text-align-center"
                                  v-model="consequence.Intensidad"
                                />
                              </td>
                              <td>
                                <button
                                  type="button"
                                  class="as-icon small-icon"
                                  v-on:click="consequence.Intensidad++"
                                >
                                  <img
                                    src="@/assets/images/plus.png"
                                    alt="Increase intensity"
                                    class="as-icon-image"
                                  />
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div class="form-label"></div>
          <div class="text-align-right">
            <button
              type="button"
              class="as-icon"
              v-on:click="saveCreatedData(indexConsequence)"
            >
              <img
                src="@/assets/images/check.png"
                alt="Toggle"
                class="as-icon-image"
              />
            </button>
            <div class="error-message" v-if="errorOnCreate">
              {{ errorOnCreate.name }}. {{ errorOnCreate.message }}
            </div>
          </div>
        </div>
      </div>

      <!-- CONTENTS ON FACTS -->
      <div v-if="pageMode === 'facts'">
        <div class="text-align-center facts-date-row">
          <table class="width-100-x100">
            <tbody>
              <tr>
                <td>
                  <button
                    type="button"
                    class="as-icon small-icon"
                    v-on:click="goToPreviousDate"
                  >
                    <img
                      src="@/assets/images/previous.png"
                      alt="Toggle"
                      class="as-icon-image"
                    />
                  </button>
                </td>
                <td class="width-100-x100">
                  <div class="facts-date">{{ printableDate }}</div>
                </td>
                <td>
                  <button
                    type="button"
                    class="as-icon small-icon"
                    v-on:click="goToNextDate"
                  >
                    <img
                      src="@/assets/images/next.png"
                      alt="Toggle"
                      class="as-icon-image"
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="width-100-x100" style="border-collapse: collapse;">
            <tbody v-if="loadedFacts && loadedFacts.length === 0">
              <tr>
                <td colspan="5">
                  <span class="datetime-cell">No facts about {{ page.toLowerCase() }} found.</span>
                </td>
              </tr>
            </tbody>
            <tbody
              class="card text-align-center"
               :class="{'background-red': page === 'Goals' && fact.Intensidad < 0, 'background-green': page === 'Goals' && fact.Intensidad > 0}"
              v-else
              v-for="(fact, indexFact) in loadedFacts"
              v-bind:key="indexFact"
            >
              <tr>
                <td class="datetime-cell datetime-cell-date">
                  <div>
                    <!--div>{{ fact.Fecha }}</div-->
                    <div>{{ fact.Hora }}</div>
                  </div>
                </td>
                <td class="width-100-x100 text-align-left datetime-cell-title">
                  {{ fact.Nombre.replace(/\[[^\]]+\]/g, "") }} ({{ fact.Intensidad }})
                </td>
                <td class="datetime-cell" v-if="selectedFact === indexFact">
                  <button
                    type="button"
                    class="as-icon small-icon"
                    v-on:click="removeFact(indexFact)"
                  >
                    <img
                      src="@/assets/images/trash.png"
                      alt="Delete"
                      class="as-icon-image"
                    />
                  </button>
                </td>
                <td v-else></td>
                <td class="datetime-cell">
                  <button
                    type="button"
                    class="as-icon small-icon"
                    v-on:click="toggleFact(indexFact)"
                  >
                    <img
                      v-if="selectedFact !== indexFact"
                      src="@/assets/images/eye.png"
                      alt="Toggle"
                      class="as-icon-image"
                    />
                    <img
                      v-else
                      src="@/assets/images/check.png"
                      alt="Toggle"
                      class="as-icon-image"
                    />
                  </button>
                </td>
              </tr>
              <tr v-if="selectedFact === indexFact">
                <td class="datetime-cell" colspan="100">
                  <table id="details-table" class="width-100-x100">
                    <tbody>
                      <tr>
                        <td class="property-cell">ID:</td>
                        <td class="width-100-x100 text-align-left">{{ fact.Id }}</td>
                      </tr>
                      <tr>
                        <td class="property-cell">Name:</td>
                        <td colspan="5" class="width-100-x100 text-align-left">{{ fact.Nombre }}</td>
                      </tr>
                      <tr>
                        <td class="property-cell">Details:</td>
                        <td colspan="5" class="width-100-x100 text-align-left">{{ fact.Detalles }}</td>
                      </tr>
                      <tr>
                        <td class="property-cell">Intensity:</td>
                        <td colspan="5" class="width-100-x100 text-align-left">{{ fact.Intensidad }}</td>
                      </tr>
                      <tr>
                        <td class="property-cell">Associated consequences:</td>
                        <td colspan="5" class="width-100-x100 text-align-left">
                          <ul>
                            <li v-for="(conseq, indexConseq) in fact.AssociatedConsequences" v-bind:key="indexConseq">
                              {{indexConseq}}. {{ toTable(conseq.destinationType) }}: {{ conseq.Nombre }}
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td class="property-cell">Original fact:</td>
                        <td class="text-align-left">
                          <pre>{{ fact.HechoOriginal }}</pre>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div style="min-height: 25px"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- CONTENTS ON PROTOTYPES -->
      <div v-if="pageMode === 'prototypes'">
        <div class="text-align-center onePrototypes-date-row">
          <table class="width-100-x100">
            <tbody v-if="loadedOwnPrototypes && loadedOwnPrototypes.length === 0">
              <tr>
                <td colspan="5">
                  <span class="datetime-cell">No prototypes about {{ page.toLowerCase() }} found.</span>
                </td>
              </tr>
            </tbody>
            <tbody
              class="card text-align-center"
              v-else
              v-for="(onePrototype, indexPrototype) in loadedOwnPrototypes"
              v-bind:key="indexPrototype"
            >
              <tr>
                <td class="width-100-x100 text-align-left datetime-cell-title">
                  {{ onePrototype.Nombre }}
                </td>
                <td class="datetime-cell" v-if="selectedPrototype === indexPrototype">
                  <button
                    type="button"
                    class="as-icon small-icon"
                    v-on:click="removePrototype(indexPrototype)"
                  >
                    <img
                      src="@/assets/images/trash.png"
                      alt="Delete"
                      class="as-icon-image"
                    />
                  </button>
                </td>
                <td v-else></td>
                <td class="datetime-cell">
                  <button
                    type="button"
                    class="as-icon small-icon"
                    v-on:click="togglePrototype(indexPrototype)"
                  >
                    <img
                      v-if="selectedPrototype !== indexPrototype"
                      src="@/assets/images/eye.png"
                      alt="Toggle"
                      class="as-icon-image"
                    />
                    <img
                      v-else
                      src="@/assets/images/check.png"
                      alt="Toggle"
                      class="as-icon-image"
                    />
                  </button>
                </td>
              </tr>
              <tr v-if="selectedPrototype === indexPrototype">
                <td class="datetime-cell" colspan="100">
                  <table class="width-100-x100">
                    <tbody>
                      <tr>
                        <td>ID:</td>
                        <td class="width-100-x100 text-align-left">{{ onePrototype.Id }}</td>
                      </tr>
                      <tr>
                        <td>Name:</td>
                        <td class="width-100-x100 text-align-left">{{ onePrototype.Nombre }}</td>
                      </tr>
                      <tr>
                        <td>Details:</td>
                        <td class="width-100-x100 text-align-left">{{ onePrototype.Detalles }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div style="min-height: 25px"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- END OF CONTENTS ON PROTOTYPES -->
    </div>
  </div>
</template>

<script>
export default {
  name: "StandardDataPage",
  props: {
    root: {
      type: Object,
      required: true,
    },
  },
  data() {
    const currentDate = new Date();
    window.sdp = this;
    return {
      page: this.root.datatypePage,
      pageToTable: this.toTable(this.root.datatypePage),
      pageToPrototypeTable: this.toTable(this.root.datatypePage) + "_Predefinido",
      pageToFactTable: this.toTable(this.root.datatypePage) + "_Efectivo",
      selectedDate: currentDate,
      printableDate: this.formatDate(currentDate),
      selectedItemList: [],
      selectedFact: -1,
      selectedPrototype: -1,
      loadedFacts: [],
      loadedPrototypes: [],
      loadedOwnPrototypes: [],
      isSelectedParentPanel: false,
      selectedParentPrototype: undefined,
      itemToCreate: this.generateItemToCreate(currentDate),
      selectedConsequence: undefined,
      selectedStimulus: undefined,
      pageMode: "facts",
      subpageMode: undefined,
      errorOnCreate: undefined,
    };
  },
  async mounted() {
    try {
      await this.loadFacts();
      await this.loadPrototypes();
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    getTableFromPageAndPageMode(page, pagemode = "facts") {
      let table1 = "",
        table2 = "";
      if (page === "Food") {
        table1 = "Alimento_";
      } else if (page === "Thought") {
        table1 = "Pensamiento_";
      } else if (page === "Movement") {
        table1 = "Movimiento_";
      } else if (page === "Goals") {
        table1 = "Objetivo_";
      }
      if (pagemode === "prototypes") {
        table2 = "Predefinido";
      } else if (pagemode === "facts") {
        table2 = "Efectivo";
      }
      return table1 + table2;
    },
    loadFacts: async function () {
      try {
        const tablename = this.getTableFromPageAndPageMode(
          this.page,
          this.pageMode
        );
        // const { result } = await this.root.$api.db[tablename].select();
        const { result } = await this.root.$api.db[tablename].select({ "Fecha": this.formatFecha(this.selectedDate) });
        this.loadedFacts = result.sort((a,b) => {
          return a.Hora < b.Hora ? 1 : -1;
        });
      } catch (error) {
        console.error(error);
      }
    },
    loadPrototypes: async function() {
      try {
        this.loadedPrototypes = await this.root.$api.getAllPrototypes();
        this.loadedOwnPrototypes = this.loadedPrototypes[this.pageToPrototypeTable];
      } catch (error) {
        console.error("Error on «loadPrototypes»:", error);
        throw error;
      }
    },
    goToPreviousDate() {
      const newDate = new Date();
      newDate.setDate(this.selectedDate.getDate() - 1);
      this.selectedDate = newDate;
      if(this.pageMode === "facts") {
        this.loadFacts();
      }
    },
    goToNextDate() {
      const newDate = new Date();
      newDate.setDate(this.selectedDate.getDate() + 1);
      this.selectedDate = newDate;
      if(this.pageMode === "facts") {
        this.loadFacts();
      }
    },
    goToCreateMode() {
      this.pageMode = "create";
    },
    goToFactsMode() {
      this.pageMode = "facts";
      this.loadFacts();
    },
    goToPrototypesMode() {
      this.pageMode = "prototypes";
      this.loadPrototypes();
    },
    removeConsequenceItem(index) {
      this.itemToCreate.AssociatedConsequences.splice(index, 1);
      this.selectedConsequence = undefined;
    },
    addConsequenceItem() {
      if(!("AssociatedConsequences" in this.itemToCreate)) {
        this.itemToCreate.AssociatedConsequences = [];
      }
      this.itemToCreate.AssociatedConsequences.push({
        destinationType: undefined,
        destinationID: undefined,
        destinationName: undefined,
        isSelectedDestination: false,
        selectedDestinationPrototype: undefined,
        Intensidad: 1,
      });
      this.selectedConsequence = this.itemToCreate.AssociatedConsequences.length-1;
    },
    formatDate(date) {
      return `${this.root.pad("00", date.getDate(), true)}/${this.root.pad(
        "00",
        date.getMonth() + 1,
        true
      )}/${date.getFullYear()}`;
    },
    toggleConsequence(indexConsequence) {
      const isSame = this.selectedConsequence === indexConsequence;
      if (isSame) {
        this.selectedConsequence = undefined;
      } else {
        this.selectedConsequence = indexConsequence;
      }
    },
    toTable(s) {
      if (s.toLowerCase() === "food") {
        return "Alimento";
      } else if (s.toLowerCase() === "thought") {
        return "Pensamiento";
      } else if (s.toLowerCase() === "movement") {
        return "Movimiento";
      } else if (s.toLowerCase() === "goals") {
        return "Objetivo";
      }
    },
    toPrototypeTable(s) {
      return this.toTable(s) + "_Predefinido";
    },
    setErrorOnCreate(error) {
      this.errorOnCreate = error;
      setTimeout(() => {
        this.errorOnCreate = undefined;
      }, 5000);
    },
    async saveCreatedData() {
      try {
        const item = this.itemToCreate;
        const saveableItem = {};
        Object.assign(saveableItem, item);
        const response = await this.root.$api.saveData(
          saveableItem,
          this.page
        );
        if (response instanceof Error) {
          throw response;
        }
        this.pageMode = "facts";
        this.itemToCreate = this.generateItemToCreate(new Date());
        await this.loadFacts();
      } catch (error) {
        console.error(error);
        return this.setErrorOnCreate(error);
      }
    },
    selectParentPrototype(indexPrototype) {
      const isSame = this.selectedParentPrototype === indexPrototype;
      if (isSame) {
        this.selectedParentPrototype = undefined;
      } else {
        this.selectedParentPrototype = indexPrototype;
      }
    },
    setParentPrototype(onePrototype) {
      console.log(onePrototype);
      Object.assign(this.itemToCreate, {
        parentID: onePrototype.Id,
        parentName: onePrototype.Nombre,
        Nombre: onePrototype.Nombre,
        Detalles: onePrototype.Detalles,
        AssociatedConsequences: onePrototype.AssociatedConsequences || [],
      });
      this.selectedParentPrototype = undefined;
      this.isSelectedParentPanel = false;
    },
    toggleParentPanel() {
      this.isSelectedParentPanel = !this.isSelectedParentPanel;
    },
    selectDestinationPrototype(onePrototype, stimulus) {
      const isSame = stimulus.selectedDestinationPrototype === onePrototype;
      if (!isSame) {
        stimulus.selectedDestinationPrototype = onePrototype;
      }
    },
    setDestinationPrototype(onePrototype, stimulus) {
      Object.assign(stimulus, onePrototype, { Id: undefined });
      stimulus.destinationID = onePrototype.Id;
      stimulus.destinationName = onePrototype.Nombre;
      stimulus.isSelectedDestination = false;
    },
    generateItemToCreate(currentDate) {
      return {
        Nombre: "",
        Detalles: "",
        parentID: undefined,
        parentName: undefined,
        asPrototype: false,
        Fecha: this.formatFecha(currentDate),
        Hora: this.formatHora(currentDate),
        AssociatedConsequences: [],
      };
    },
    formatFechaInversa(currentDate) {
      return `${this.root.pad("00", currentDate.getDate(), true)}-${this.root.pad(
          "00",
          currentDate.getMonth() + 1,
          true
        )}-${currentDate.getFullYear()}`;
    },
    formatFecha(currentDate) {
      return `${currentDate.getFullYear()}-${this.root.pad(
          "00",
          currentDate.getMonth() + 1,
          true
        )}-${this.root.pad("00", currentDate.getDate(), true)}`;
    },
    formatHora(currentDate) {
      return `${this.root.pad(
          "00",
          currentDate.getHours(),
          true
        )}:${this.root.pad(
          "00",
          currentDate.getMinutes(),
          true
        )}:${this.root.pad("00", currentDate.getSeconds())}`;
    },
    async removeFact(indexFact) {
      try {
        const fact = this.loadedFacts[indexFact]
        const idFact = fact.Id;
        const yes = window.confirm(`Delete: ${JSON.stringify(fact, null, 2)}?`);
        if(!yes) {
          return false;
        }
        await this.root.$api.deleteData(this.pageToFactTable, idFact, "fact");
        await this.loadFacts();
        this.selectedFact = -1;
        return true;
      } catch(error) {
        console.error(error);
      }
    },
    async removePrototype(indexPrototype) {
      try {
        const onePrototype = this.loadedPrototypes[this.pageToPrototypeTable][indexPrototype];
        const idPrototype = onePrototype.Id;
        const yes = window.confirm(`Delete: ${JSON.stringify(onePrototype, null, 2)}?`);
        if(!yes) {
          return false;
        }
        await this.root.$api.deleteData(this.pageToPrototypeTable, idPrototype, "prototype");
        await this.loadPrototypes();
        this.selectedPrototype = -1;
        return true;
      } catch(error) {
        console.error(error);
      }
    },
    toggleFact(indexFact) {
      this.selectedFact = (this.selectedFact === indexFact) ? -1 : indexFact;
    },
    togglePrototype(indexPrototype) {
      this.selectedPrototype = (this.selectedPrototype === indexPrototype) ? -1 : indexPrototype;
    },
  },
  watch: {
    selectedDate(newValue) {
      this.printableDate = this.formatDate(newValue);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/css/app.scss";

.form-inline-options {
  display: block;
}
.form-inline-options > * {
  display: inline-block;
  cursor: pointer;
}
.form-inline-options > *.selected {
  font-weight: bold;
  text-decoration: underline;
}

.form-layout {
}
.form-item {
  display: block;
  text-align: left;
  margin-bottom: 15px;
}
.form-label {
  font-size: 10px;
  text-align: right;
  padding-top: 10px;
  border-top: 1px dashed #333;
}
.form-sublabel {
  font-size: 10px;
  text-align: right;
  padding-top: 10px;
  border-top: 1px dashed #ccc;
}
.form-input-box {
}
.form-input {
  font-size: 14px;
  width: 100%;
  border-radius: 0px;
  border: none;
  background-color: #e0e0e0;
  padding: 5px;
}
input[type="date"].form-input,
input[type="time"].form-input {
  font-size: 14px;
}

.card {
  margin-top: 10px;
  margin-bottom: 5px;
  border: none;
  padding: 5px;
}

.selectable-text {
  font-weight: bold;
  cursor: pointer;
}
.selectable-text.selected {
  text-decoration: underline;
}

.empty-message {
  font-size: 15px;
  text-align: center;
  padding-top: 10px;
}

.error-message {
  font-size: 15px;
  text-align: center;
  padding: 10px;
  background-color: $color_grey_4;
  color: #633;
  font-weight: bold;
  border: 1px solid #633;
  margin-bottom: 10px;
}

.facts-date-row {
}
.facts-date {
  font-size: 21px;
  font-weight: bold;
  text-decoration: underline;
}
.datetime-cell {
  vertical-align: middle;
  font-size: 10px;
  
  margin-bottom: 4px;
  text-align: right;
}
.datetime-cell-date {
  font-size: 13px;
  border: 1px solid #222;
  background-color: #999;
  color: #FF0;
  padding: 4px;
  font-weight: bold;
  font-family: monospace;
}
.datetime-cell-title {
  vertical-align: middle;
  font-size: 14px;
  padding-left: 10px;
}
.page-title {
  font-size: 21px;
  font-weight: bold;
  text-decoration: underline;
}

#details-table {
  background-color: #FFFFFF;
  border-collapse: collapse;
  border-bottom: 1px solid #CCCCCC;
  border-left: 3px double #CCCCCC;
  border-right: 1px solid #CCCCCC;
}
#details-table tr {
  cursor: pointer;
  transition: background-color .2s linear;
}
#details-table tr:hover {
  background-color: $color_grey_3;
}
#details-table td {
  vertical-align: top;
  border-top: 1px solid #CCCCCC;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
  padding-right: 5px;
}
#details-table td.property-cell {
  font-weight: bold;
}
</style>