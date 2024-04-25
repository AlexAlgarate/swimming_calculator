import tkinter as tk
from typing import Dict


class MenuLabel(tk.Label):
    """
    A customized label widget for menu items with
    adjustable relative positioning and size.

    Parameters:
        parent (tk.Tk): The parent tkinter window.
        text (str): The text to display on the label.
        background (str): The background color of the label.
        rely_value (float): Relative y-coordinate of the label.
        relx_value (float, optional): Relative x-coordinate
            of the label. Default is 0.05.
        relwidth_value (float, optional): Relative width of
            the label. Default is 0.23.
        relheight_value (float, optional): Relative height
            of the label. Default is 0.1.
    """

    def __init__(
        self,
        parent: tk.Tk,
        text: str,
        background: str,
        rely_value: float,
        relx_value: float = 0.05,
        relwidth_value: float = 0.23,
        relheight_value: float = 0.1,
    ):
        place_parameter: Dict[str, float] = {
            "relx": relx_value,
            "relwidth": relwidth_value,
            "relheight": relheight_value,
        }
        super().__init__(parent, text=text, background=background)
        self.place(
            **place_parameter,
            rely=rely_value,
        )
