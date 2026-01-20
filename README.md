# 🏊 Swimming Calculator

Swimming Calculator es una aplicación de escritorio desarrollada en Python utilizando Tkinter, inspirada en calculadoras de ritmo de natación y triatlón como [https://www.liquidtri.com/swim-pace-calculator](https://www.liquidtri.com/swim-pace-calculator). El objetivo del proyecto es calcular de forma rápida y sencilla el ritmo de natación (pace) en minutos por cada 100 metros, a partir de la distancia recorrida y el tiempo empleado.

## Features

- Cálculo automático del ritmo de natación.

- Interfaz gráfica simple y fácil de usar.

- Actualización en tiempo real al modificar los valores de entrada.

- Validación de los campos de distancia y tiempo.

- Aplicación ligera sin dependencias externas..

## Requirements

- Python 3.x
- Tkinter

## Installation

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/AlexAlgarate/swimming_calculator.git
   ```

2. Navegar al directorio:

   ```bash
   cd swimming_calculator
   ```

3. Crea el entorno virtual dependiendo de tu sistema operativo
   - Linux:

     ```bash
     python3 -m venv .venv
     source .venv/bin/activate
     ```

   - Windows:

     ```python
     python -m venv .venv
     .venv\Scripts\activate
     ```

4. Ejecuta la aplicación:

   ```bash
   python3 swimming_calculator.py
   ```

## Usage

1. Introduce la distancia nadada en metros.

2. Introduce el tiempo total, especificando minutos y segundos.

3. El ritmo de natación se calcula automáticamente sin necesidad de pulsar ningún botón.

4. El resultado se muestra como minutos por cada 100 metros.

ℹ️ El ritmo se recalcula cada vez que se modifica cualquiera de los campos de entrada, proporcionando una experiencia fluida e inmediata.

## 🧠 Calculation Logic

El ritmo se calcula siguiendo esta fórmula:

```python
pace = (tiempo total en segundos / distancia en metros) * 100
```

El resultado se formatea en minutos y segundos para facilitar su lectura.

## 🚀 Future Improvements

- Soporte para diferentes unidades (yardas).

- Historial de cálculos.

- Estilos visuales mejorados.

- Exportación de resultados.
